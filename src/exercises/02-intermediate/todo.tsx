// Many helpful tips were taken from this example: https://github.com/mdn/todo-react
import React from 'react'

type TaskType = Readonly<{
  id: number
  text: string
  done: boolean
}>

type TaskId = TaskType['id']

const initialTasks: TaskType[] = [
  { id: 1, text: 'Learn React', done: true },
  { id: 2, text: 'Learn Redux', done: false },
]

type ActionType =
  | { type: 'toggle'; payload: TaskId }
  | { type: 'remove'; payload: TaskId }
  | { type: 'add'; payload: string }
  | { type: 'edit'; payload: { id: TaskId; text: string } }
  | { type: 'markAllCompleted' }
  | { type: 'clearCompleted' }

function tasksReducer(
  state: typeof initialTasks,
  action: ActionType
): typeof initialTasks {
  switch (action.type) {
    case 'toggle': {
      const id = action.payload
      return state.map(task => (task.id === id ? { ...task, done: !task.done } : task))
    }
    case 'remove': {
      return state.filter(task => task.id !== action.payload)
    }
    case 'add': {
      const newTask: TaskType = {
        id: Date.now(),
        text: action.payload,
        done: false,
      }
      return state.concat(newTask)
    }
    case 'edit': {
      const { id, text } = action.payload
      return state.map(task => (task.id === id ? { ...task, text } : task))
    }
    case 'markAllCompleted': {
      return state.map(task => ({ ...task, done: true }))
    }
    case 'clearCompleted': {
      return state.filter(task => !task.done)
    }
  }
}

const filters = {
  all: () => true,
  active: (task: TaskType) => !task.done,
  completed: (task: TaskType) => task.done,
}

type FilterType = keyof typeof filters
const filterNames = Object.keys(filters) as FilterType[]

// Possible other features:
// - search by name
// - add new to start / add new to end
// - color filters
// - local storage support
export default function TodoApp() {
  const [tasks, dispatch] = React.useReducer(tasksReducer, initialTasks)
  const [filter, setFilter] = React.useState<FilterType>('all')
  const [editedId, setEditedId] = React.useState<TaskId | null>(null)

  const tasksRemaining = tasks.length
  const suffix = tasksRemaining === 1 ? '' : 's'

  const filterButtons = filterNames.map(filterName => {
    const isPressed = filter === filterName
    return (
      <button
        key={filterName}
        aria-pressed={isPressed}
        aria-label={`Show ${filterName} tasks`}
        style={{ fontWeight: isPressed ? 'bold' : undefined }}
        onClick={() => setFilter(filterName)}
      >
        {capitalize(filterName)}
      </button>
    )
  })

  const filteredTasks = tasks
    .filter(filters[filter])
    .map(task => (
      <Task
        key={task.id}
        task={task}
        dispatch={dispatch}
        isEditing={task.id === editedId}
        onEditChange={isEdited => setEditedId(isEdited ? task.id : null)}
      />
    ))

  return (
    <div>
      <TaskForm tasks={tasks} dispatch={dispatch} />
      <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>{filterButtons}</div>
      <h3 id='list-heading'>{`${tasksRemaining} task${suffix} remaining`}</h3>
      {/* List heading is not announced on google chrome screen reader without an explicit role. */}
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role='list'
        aria-labelledby='list-heading'
        style={{ padding: 0, listStyle: 'none' }}
      >
        {filteredTasks}
      </ul>
      <h3 id='actions-heading'>Actions</h3>
      <div
        role='group'
        aria-labelledby='actions-heading'
        style={{ display: 'flex', gap: 5, marginTop: 10 }}
      >
        <button
          aria-label='Mark all tasks completed'
          onClick={() => dispatch({ type: 'markAllCompleted' })}
        >
          Mark all Completed
        </button>
        <button
          aria-label='Clear completed tasks'
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear Completed
        </button>
      </div>
    </div>
  )
}

function TaskForm({
  tasks,
  dispatch,
}: {
  tasks: TaskType[]
  dispatch: React.Dispatch<ActionType>
}) {
  const [text, setText] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (text.length === 0) {
      return
    }
    dispatch({ type: 'add', payload: text })
    setText('')
    // Form doesn't focus the input if submit was triggered by a button click.
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        <label htmlFor='new-task-input' style={{ display: 'block' }}>
          What needs to be done?
        </label>
      </h3>
      <input
        id='new-task-input'
        ref={inputRef}
        style={{ marginRight: 5 }}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit'>Add #{tasks.length + 1}</button>
    </form>
  )
}

function Task({
  task,
  dispatch,
  isEditing,
  onEditChange,
}: {
  task: TaskType
  dispatch: React.Dispatch<ActionType>
  isEditing: boolean
  onEditChange: (isEdited: boolean) => void
}) {
  const editInputRef = React.useRef<HTMLInputElement>(null)
  const editButtonRef = React.useRef<HTMLButtonElement>(null)
  const wasEditing = usePrevious(isEditing)

  React.useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    } else if (wasEditing) {
      editButtonRef.current?.focus()
    }
  }, [isEditing, wasEditing])

  let element

  if (isEditing) {
    element = (
      <form onSubmit={e => e.preventDefault()}>
        <input
          ref={editInputRef}
          value={task.text}
          onChange={e =>
            dispatch({
              type: 'edit',
              payload: { id: task.id, text: e.target.value },
            })
          }
        />
        <button
          type='submit'
          aria-label={`Save ${task.text}`}
          onClick={() => onEditChange(false)}
          style={{ marginLeft: 5 }}
        >
          Save
        </button>
      </form>
    )
  } else {
    element = (
      <div>
        <label>
          <input
            type='checkbox'
            checked={task.done}
            onChange={() => dispatch({ type: 'toggle', payload: task.id })}
          />
          <span style={{ margin: '0 5px' }}>
            {task.done ? <del>{task.text}</del> : task.text}
          </span>
        </label>
        <button
          ref={editButtonRef}
          aria-label={`Edit ${task.text}`}
          style={{ marginRight: 5 }}
          onClick={() => onEditChange(true)}
        >
          Edit
        </button>
        <button
          aria-label={`Delete ${task.text}`}
          onClick={() => dispatch({ type: 'remove', payload: task.id })}
        >
          Delete
        </button>
      </div>
    )
  }

  return <li style={{ marginTop: 10 }}>{element}</li>
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

function usePrevious<T>(value: T): T | null {
  const valueRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef.current
}

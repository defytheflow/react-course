// Many helpful tips were taken from this example: https://github.com/mdn/todo-react
import React from 'react'
import { capitalize } from '~/utils/misc'
import usePrevious from '~/utils/use-previous'

const availableColors = ['green', 'blue', 'orange', 'purple', 'red'] as const

type TaskType = Readonly<{
  id: number
  text: string
  done: boolean
  color?: typeof availableColors[number]
}>

type TaskId = TaskType['id']
type TaskColor = TaskType['color']

const initialTasks: TaskType[] = [
  { id: 1, text: 'Learn React', done: true, color: 'green' },
  { id: 2, text: 'Learn Redux', done: false, color: 'purple' },
]

type ActionType =
  | { type: 'toggle'; payload: TaskId }
  | { type: 'remove'; payload: TaskId }
  | { type: 'add'; payload: string }
  | { type: 'edit'; payload: { id: TaskId; text: string } }
  | { type: 'set_color'; payload: { id: TaskId; color: TaskColor } }
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
      const sortedIds = state.map(task => task.id).sort((a, b) => a - b) // in case tasks get reordered.
      const prevMaxId = sortedIds[sortedIds.length - 1] ?? 0 // in case no tasks exist.
      const newTask: TaskType = {
        id: prevMaxId + 1,
        text: action.payload,
        done: false,
      }
      return state.concat(newTask)
    }
    case 'edit': {
      const { id, text } = action.payload
      return state.map(task => (task.id === id ? { ...task, text } : task))
    }
    case 'set_color': {
      const { id, color } = action.payload
      return state.map(task => (task.id === id ? { ...task, color } : task))
    }
    case 'markAllCompleted': {
      return state.map(task => ({ ...task, done: true }))
    }
    case 'clearCompleted': {
      return state.filter(task => !task.done)
    }
  }
}

enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const filterValues = Object.values(StatusFilter)

// Possible other features:
// - search by name
// - add new to start / add new to end
// - local storage support
// - normalize data
// - add tasks reordering somehow.
export default function TodoApp() {
  const [tasks, dispatch] = React.useReducer(tasksReducer, initialTasks)
  const [status, setStatus] = React.useState<StatusFilter>(StatusFilter.ALL)
  const [colors, setColors] = React.useState<TaskColor[]>([])
  const [editedId, setEditedId] = React.useState<TaskId | null>(null)

  let filteredTasks = tasks
  if (status !== StatusFilter.ALL || colors.length !== 0) {
    const showCompleted = status === StatusFilter.COMPLETED
    filteredTasks = tasks.filter(task => {
      const statusMatches = status === 'all' || task.done === showCompleted
      const colorMatches = colors.length === 0 || colors.includes(task.color)
      return statusMatches && colorMatches
    })
  }

  const tasksRemaining = tasks.length
  const suffix = tasksRemaining === 1 ? '' : 's'

  return (
    <div>
      <TaskForm tasks={tasks} dispatch={dispatch} />
      <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
        {filterValues.map(filterValue => {
          const isActive = status === filterValue
          return (
            <button
              key={filterValue}
              aria-pressed={isActive}
              aria-label={`Show ${filterValue} tasks`}
              style={{ fontWeight: isActive ? 'bold' : undefined }}
              onClick={() => setStatus(filterValue)}
            >
              {capitalize(filterValue)}
            </button>
          )
        })}
      </div>

      <h3 id='list-heading'>{`${tasksRemaining} task${suffix} remaining`}</h3>
      {/* List heading is not announced on google chrome screen reader without an explicit role. */}
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role='list'
        aria-labelledby='list-heading'
        style={{ padding: 0, listStyle: 'none' }}
      >
        {filteredTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            dispatch={dispatch}
            isEditing={task.id === editedId}
            onEditChange={isEdited => setEditedId(isEdited ? task.id : null)}
          />
        ))}
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

      <div>
        <h3 id='filter-by-color-heading'>Filter By Color</h3>
        <form
          aria-labelledby='filter-by-color-heading'
          style={{ display: 'flex', flexDirection: 'row', gap: 5 }}
        >
          {availableColors.map(color => (
            <label key={color}>
              <input
                type='checkbox'
                checked={colors.includes(color)}
                // prettier-ignore
                onChange={e => setColors(prevColors => e.target.checked ? [...prevColors, color] : prevColors.filter(c => c !== color))}
              />
              <span
                style={{
                  backgroundColor: color,
                  display: 'inline-block',
                  width: 20,
                  height: 12,
                  borderRadius: 3,
                  margin: '0 5px',
                }}
              ></span>
              {capitalize(color)}
            </label>
          ))}
        </form>
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

    const cleanText = text.trim()
    if (cleanText.length === 0) {
      return
    }

    dispatch({ type: 'add', payload: cleanText })
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
        <select
          value={task.color}
          style={{ color: task.color, fontWeight: 700 }}
          onChange={e =>
            dispatch({
              type: 'set_color',
              payload: { id: task.id, color: e.target.value as TaskColor },
            })
          }
        >
          <option value=''></option>
          {availableColors.map(color => (
            <option key={color} value={color} style={{ color }}>
              {capitalize(color)}
            </option>
          ))}
        </select>
        <button
          ref={editButtonRef}
          aria-label={`Edit ${task.text}`}
          style={{ margin: '0 5px' }}
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

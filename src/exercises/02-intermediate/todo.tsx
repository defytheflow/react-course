import React from 'react'

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

enum Order {
  EARLIEST = 'earliest',
  LATEST = 'latest',
}

type TaskType = {
  id: number
  text: string
  done: boolean
  date: Date
}

type TaskId = TaskType['id']

const initialTasks: TaskType[] = [
  {
    id: 1,
    text: 'Learn React',
    done: true,
    date: new Date(),
  },
  {
    id: 2,
    text: 'Learn Redux',
    done: false,
    date: new Date(),
  },
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
        date: new Date(),
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

const filterFuncs: Record<Filter, (task: TaskType) => boolean> = {
  [Filter.ALL]: Boolean,
  [Filter.ACTIVE]: task => !task.done,
  [Filter.COMPLETED]: task => task.done,
}

const compareFuncs: Record<Order, (a: TaskType, b: TaskType) => number> = {
  [Order.EARLIEST]: (a, b) => a.date.getTime() - b.date.getTime(),
  [Order.LATEST]: (a, b) => b.date.getTime() - a.date.getTime(),
}

function calculateTasks(
  tasks: TaskType[],
  filter: Filter,
  order: Order | null
): TaskType[] {
  const filteredTasks = tasks.filter(filterFuncs[filter])

  if (order !== null) {
    filteredTasks.sort(compareFuncs[order])
  }

  return filteredTasks
}

// Possible other features:
// - search by name
// - add new to start / add new to end
// - color filters
// - local storage support
export default function TodoApp() {
  const [tasks, dispatch] = React.useReducer(tasksReducer, initialTasks)
  const [filter, setFilter] = React.useState(Filter.ALL)
  const [order, setOrder] = React.useState<Order | null>(null)

  const filteredTasks = calculateTasks(tasks, filter, order)
  const tasksRemaining = tasks.filter(task => !task.done).length
  const suffix = tasksRemaining === 1 ? '' : 's'

  return (
    <div>
      <div style={{ display: 'flex', gap: 5 }}>
        <button
          aria-pressed={order === Order.EARLIEST}
          style={{ fontWeight: order === Order.EARLIEST ? 'bold' : undefined }}
          onClick={() => setOrder(Order.EARLIEST)}
        >
          Sort by Earliest
        </button>
        <button
          aria-pressed={order === Order.LATEST}
          style={{ fontWeight: order === Order.LATEST ? 'bold' : undefined }}
          onClick={() => setOrder(Order.LATEST)}
        >
          Sort by Latest
        </button>
      </div>
      <TaskList tasks={filteredTasks} dispatch={dispatch} />
      <TaskForm tasks={tasks} dispatch={dispatch} />
      <h3>Remaining Todos</h3>
      <strong>{tasksRemaining}</strong> item{suffix} left
      <TaskActions dispatch={dispatch} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
    </div>
  )
}

function TaskList({
  tasks,
  dispatch,
}: {
  tasks: TaskType[]
  dispatch: React.Dispatch<ActionType>
}) {
  const [editedId, setEditedId] = React.useState<TaskId | null>(null)
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginTop: 10 }}>
          <TaskItem
            task={task}
            dispatch={dispatch}
            isEdited={task.id === editedId}
            onEditChange={isEdited => setEditedId(isEdited ? task.id : null)}
          />
        </li>
      ))}
    </ul>
  )
}

function TaskItem({
  task,
  dispatch,
  isEdited,
  onEditChange,
}: {
  task: TaskType
  dispatch: React.Dispatch<ActionType>
  isEdited: boolean
  onEditChange: (isEdited: boolean) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus()
    }
  }, [isEdited])

  const textElement = isEdited ? (
    <input
      ref={inputRef}
      value={task.text}
      onChange={e =>
        dispatch({ type: 'edit', payload: { id: task.id, text: e.target.value } })
      }
      onKeyDown={e => e.key === 'Enter' && onEditChange(false)}
    />
  ) : task.done ? (
    <del>{task.text}</del>
  ) : (
    task.text
  )

  return (
    <>
      <label>
        <input
          type='checkbox'
          checked={task.done}
          onChange={() => dispatch({ type: 'toggle', payload: task.id })}
        />
        <span style={{ margin: '0 5px' }}>{textElement}</span>
      </label>
      <button
        aria-label={(isEdited ? 'Save ' : 'Edit ') + task.text}
        style={{ marginRight: 5 }}
        onClick={() => onEditChange(!isEdited)}
      >
        {isEdited ? 'save' : 'edit'}
      </button>
      <button
        aria-label={`Delete ${task.text}`}
        onClick={() => dispatch({ type: 'remove', payload: task.id })}
      >
        delete
      </button>
      <span style={{ marginLeft: 5 }}>{task.date.toLocaleTimeString()}</span>
    </>
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
        <label htmlFor='new-task' style={{ display: 'block' }}>
          What needs to be done?
        </label>
      </h3>
      <input
        id='new-task'
        ref={inputRef}
        style={{ display: 'block', marginTop: 10 }}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit' style={{ marginTop: 10 }}>
        Add #{tasks.length + 1}
      </button>
    </form>
  )
}

function TaskActions({ dispatch }: { dispatch: React.Dispatch<ActionType> }) {
  return (
    <div style={{ marginTop: 10 }}>
      <h3 id='actions-heading'>Actions</h3>
      <div
        role='group'
        aria-labelledby='actions-heading'
        style={{ display: 'flex', gap: 5 }}
      >
        <button onClick={() => dispatch({ type: 'markAllCompleted' })}>
          Mark all Completed
        </button>
        <button onClick={() => dispatch({ type: 'clearCompleted' })}>
          Clear Completed
        </button>
      </div>
    </div>
  )
}

function TaskFilter({
  filter,
  onFilterChange,
}: {
  filter: Filter
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <h3 id='filter-status-heading'>Filter by status</h3>
      <div
        role='group'
        aria-labelledby='filter-status-heading'
        style={{ display: 'flex', gap: 5 }}
      >
        {Object.values(Filter).map(filterValue => (
          <button
            key={filterValue}
            aria-pressed={filter === filterValue}
            aria-label={`Show ${filterValue} tasks`}
            style={{ fontWeight: filter === filterValue ? 'bold' : undefined }}
            onClick={() => onFilterChange(filterValue)}
          >
            {capitalize(filterValue)}
          </button>
        ))}
      </div>
    </div>
  )
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

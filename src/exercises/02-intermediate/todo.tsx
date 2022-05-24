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

const initialTasks = [
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

type TaskType = typeof initialTasks[number]

type ActionType =
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'add'; payload: string }
  | { type: 'edit'; payload: { id: number; text: string } }
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
      <h2 style={{ marginTop: 0 }}>Todo</h2>
      <div style={{ display: 'flex', gap: 5 }}>
        <button
          style={{ fontWeight: order === Order.EARLIEST ? 'bold' : undefined }}
          onClick={() => setOrder(Order.EARLIEST)}
        >
          Sort by Earliest
        </button>
        <button
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
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginTop: 10 }}>
          <Task task={task} dispatch={dispatch} />
        </li>
      ))}
    </ul>
  )
}

function Task({
  task,
  dispatch,
}: {
  task: TaskType
  dispatch: React.Dispatch<ActionType>
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const textELement = isEditing ? (
    <input
      ref={inputRef}
      value={task.text}
      onChange={e =>
        dispatch({ type: 'edit', payload: { id: task.id, text: e.target.value } })
      }
      onKeyDown={e => e.key === 'Enter' && setIsEditing(!isEditing)}
    />
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
        <span style={{ margin: '0 5px' }}>{textELement}</span>
      </label>
      <button style={{ marginRight: 5 }} onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'save' : 'edit'}
      </button>
      <button onClick={() => dispatch({ type: 'remove', payload: task.id })}>
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
      <label htmlFor='new-task' style={{ display: 'block' }}>
        What needs to be done?
      </label>
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

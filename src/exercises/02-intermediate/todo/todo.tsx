import React from 'react'
import withTitle from '../../../utils/with-title'

type Todo = {
  id: number
  text: string
  done: boolean
  date: Date
}

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

enum Order {
  EARLIEST = 'earliest',
  LATEST = 'latest',
}

const initialTodos: Todo[] = [
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
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'add'; payload: string }
  | { type: 'markAllCompleted' }
  | { type: 'clearCompleted' }

function todosReducer(
  state: typeof initialTodos,
  action: ActionType
): typeof initialTodos {
  switch (action.type) {
    case 'toggle': {
      const id = action.payload
      return state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    }
    case 'remove': {
      return state.filter(todo => todo.id !== action.payload)
    }
    case 'add': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        done: false,
        date: new Date(),
      }
      return state.concat(newTodo)
    }
    case 'markAllCompleted': {
      return state.map(todo => ({ ...todo, done: true }))
    }
    case 'clearCompleted': {
      return state.filter(todo => !todo.done)
    }
  }
}

const filterFuncs: Record<Filter, (todo: Todo) => boolean> = {
  [Filter.ALL]: Boolean,
  [Filter.ACTIVE]: todo => !todo.done,
  [Filter.COMPLETED]: todo => todo.done,
}

const compareFuncs: Record<Order, (a: Todo, b: Todo) => number> = {
  [Order.EARLIEST]: (a, b) => a.date.getTime() - b.date.getTime(),
  [Order.LATEST]: (a, b) => b.date.getTime() - a.date.getTime(),
}

function calculateTodos(todos: Todo[], filter: Filter, order: Order | null): Todo[] {
  const filteredTodos = todos.filter(filterFuncs[filter])

  if (order !== null) {
    filteredTodos.sort(compareFuncs[order])
  }

  return filteredTodos
}

// Possible other features:
// - search by name
// - edit name
// - add new to start / add new to end
// - color filters
// - local storage support
function TodoApp() {
  const [todos, dispatch] = React.useReducer(todosReducer, initialTodos)
  const [filter, setFilter] = React.useState(Filter.ALL)
  const [order, setOrder] = React.useState<Order | null>(null)
  const filteredTodos = calculateTodos(todos, filter, order)

  const numTodosRemaining = todos.filter(todo => !todo.done).length
  const suffix = numTodosRemaining === 1 ? '' : 's'

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Todo</h2>
      <div style={{ display: 'flex', gap: 8 }}>
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
      <TodoList todos={filteredTodos} dispatch={dispatch} />
      <TodoAddForm todos={todos} dispatch={dispatch} />
      <h3>Remaining Todos</h3>
      <strong>{numTodosRemaining}</strong> item{suffix} left
      <TodoActions dispatch={dispatch} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
    </div>
  )
}

function TodoList({
  todos,
  dispatch,
}: {
  todos: Todo[]
  dispatch: React.Dispatch<ActionType>
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ marginTop: 10 }}>
          <input
            type='checkbox'
            checked={todo.done}
            onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
          />
          <span style={{ margin: '0 5px' }}>{todo.text}</span>
          <button
            aria-label='Remove item'
            onClick={() => dispatch({ type: 'remove', payload: todo.id })}
          >
            &times;
          </button>
          <span style={{ marginLeft: 8 }}>{todo.date.toLocaleTimeString()}</span>
        </li>
      ))}
    </ul>
  )
}

function TodoAddForm({
  todos,
  dispatch,
}: {
  todos: Todo[]
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
      <label htmlFor='new-todo' style={{ display: 'block' }}>
        What needs to be done?
      </label>
      <input
        id='new-todo'
        ref={inputRef}
        style={{ display: 'block', marginTop: 10 }}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit' style={{ marginTop: 10 }}>
        Add #{todos.length + 1}
      </button>
    </form>
  )
}

function TodoActions({ dispatch }: { dispatch: React.Dispatch<ActionType> }) {
  return (
    <div style={{ marginTop: 10 }}>
      <h3 id='actions-heading'>Actions</h3>
      <div
        role='group'
        aria-labelledby='actions-heading'
        style={{ display: 'flex', gap: 8 }}
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

function TodoFilter({
  filter,
  onFilterChange,
}: {
  filter: Filter
  onFilterChange: (newFilter: Filter) => void
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <h3 id='filter-status-heading'>Filter by status</h3>
      <div
        role='group'
        aria-labelledby='filter-status-heading'
        style={{ display: 'flex', gap: 8 }}
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

export default withTitle(TodoApp, 'Todo')

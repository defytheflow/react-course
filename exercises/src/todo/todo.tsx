import React from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

// Possible other features:
// - search by name
// - edit name
// - color filters
// - local storage support

export default function TodoApp() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [filter, setFilter] = React.useState(Filter.ALL)

  const filteredTodos = React.useMemo(() => {
    switch (filter) {
      case Filter.ALL: {
        return todos
      }
      case Filter.ACTIVE: {
        return todos.filter(todo => !todo.done)
      }
      case Filter.COMPLETED: {
        return todos.filter(todo => todo.done)
      }
      default: {
        return todos
      }
    }
  }, [filter, todos])

  function handleTodoToggle(todo: Todo) {
    setTodos(prevTodos =>
      prevTodos.map(t => (t.id === todo.id ? { ...t, done: !todo.done } : t))
    )
  }

  function handleTodoDelete(todo: Todo) {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id))
  }

  function handleTodoAdd(newTodo: Todo) {
    setTodos(prevTodos => prevTodos.concat(newTodo))
  }

  function handleMarkAllCompleted() {
    setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, done: true })))
  }

  function handleClearCompleted() {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.done))
  }

  const numTodosRemaining = todos.filter(todo => !todo.done).length
  const suffix = numTodosRemaining === 1 ? '' : 's'

  return (
    <div>
      <h1>Todo</h1>
      <TodoList
        todos={filteredTodos}
        onTodoToggle={handleTodoToggle}
        onTodoDelete={handleTodoDelete}
      />
      <TodoAddForm todos={todos} onTodoAdd={handleTodoAdd} />
      <h3>Remaining Todos</h3>
      <strong>{numTodosRemaining}</strong> item{suffix} left
      <TodoActions
        todos={todos}
        onMarkAllCompleted={handleMarkAllCompleted}
        onClearCompleted={handleClearCompleted}
      />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
    </div>
  )
}

function TodoList({
  todos,
  onTodoToggle,
  onTodoDelete,
}: {
  todos: Todo[]
  onTodoToggle: (todo: Todo) => void
  onTodoDelete: (todo: Todo) => void
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ marginTop: 10 }}>
          <input type='checkbox' checked={todo.done} onChange={e => onTodoToggle(todo)} />
          <span style={{ margin: '0 5px' }}>{todo.text}</span>
          <button aria-label='Remove item' onClick={() => onTodoDelete(todo)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  )
}

function TodoAddForm({
  todos,
  onTodoAdd,
}: {
  todos: Todo[]
  onTodoAdd: (newTodo: Todo) => void
}) {
  const [text, setText] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (text.length === 0) {
      return
    }

    const newTodo = { id: Date.now(), text, done: false }
    onTodoAdd(newTodo)
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

function TodoActions({
  todos,
  onMarkAllCompleted,
  onClearCompleted,
}: {
  todos: Todo[]
  onMarkAllCompleted: () => void
  onClearCompleted: () => void
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <h3 id='actions-heading'>Actions</h3>
      <div role='group' aria-labelledby='actions-heading'>
        <button
          // disabled={todos.every(todo => todo.done)}
          onClick={onMarkAllCompleted}
          style={{ marginRight: 8 }}
        >
          Mark all Completed
        </button>
        <button
          // disabled={!todos.some(todo => todo.done)}
          onClick={onClearCompleted}
          style={{ marginRight: 8 }}
        >
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
      <div role='group' aria-labelledby='filter-status-heading'>
        {Object.values(Filter).map(filterValue => (
          <button
            key={filterValue}
            style={{
              marginRight: 8,
              fontWeight: filter === filterValue ? 'bold' : undefined,
            }}
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

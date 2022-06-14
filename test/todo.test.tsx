import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from '~/routes/__index/exercises/intermediate/todo'

function renderTodoApp() {
  const utils = render(<TodoApp />)
  return { ...utils }
}

function getNewTodoInput() {
  return screen.getByRole('textbox', { name: /what needs to be done?/i })
}

function getAddTodoButton() {
  return screen.getByRole('button', { name: /add #/i })
}

function getTodoList() {
  return screen.getByRole('list', { name: /tasks remaining/i })
}

test('add new todo', () => {
  renderTodoApp()

  const newTodoInput = getNewTodoInput()
  const addTodoButton = getAddTodoButton()

  const todoList = getTodoList()
  const initialTodoListLength = todoList.children.length

  // Has Add #n text.
  expect(addTodoButton).toHaveTextContent(String(initialTodoListLength + 1))

  // Clicking on add button should focus the input, if input is empty.
  fireEvent.click(addTodoButton)
  expect(newTodoInput).toHaveFocus()

  // Clicking on add button doesn't create a new todo, if input is empty.
  fireEvent.click(addTodoButton)
  expect(todoList.children).toHaveLength(initialTodoListLength)

  // Clicking on add button doesn't create a new todo, if input is whitespace only.
  userEvent.type(newTodoInput, '      ')
  fireEvent.click(addTodoButton)
  expect(todoList.children).toHaveLength(initialTodoListLength)

  const newTodoText = 'This is a new todo'

  // Clicking on add button creates a new todo, if input is not empty.
  fireEvent.change(newTodoInput, { target: { value: newTodoText } })
  fireEvent.click(addTodoButton)
  expect(todoList.children).toHaveLength(initialTodoListLength + 1)

  const newTodoItem = todoList.lastChild
  expect(newTodoItem).toHaveTextContent(newTodoText)
  // Checkbox is unchecked.
  expect(screen.getByRole('checkbox', { name: newTodoText })).not.toBeChecked()
  // Color is undefined.
  expect(
    screen.getByRole('combobox', { name: new RegExp(newTodoText, 'i') })
  ).toHaveValue('')
  // Timestamp is there.
  expect(newTodoItem).toHaveTextContent(new Date().getFullYear().toString())
})

test.todo('toggle todo')

test.todo('edit todo')

test.todo('delete todo')

test.todo('status filters')

test.todo('search filter')

test.todo('color filters')

test.todo('mark all completed')

test.todo('clear completed')

import React from 'react'

type State = {
  count: number
}

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }
    case 'decrement': {
      return { count: state.count - 1 }
    }
    case 'reset': {
      return init()
    }
    default:
      return state
  }
}

function init() {
  return { count: 5 }
}

export default function Counter() {
  // const numbers = [1, 2, 3]
  // const sum = numbers.reduce((total, number) => total + number, 0)
  const [state, dispatch] = React.useReducer(counterReducer, undefined, init)

  return (
    <div>
      {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  )
}

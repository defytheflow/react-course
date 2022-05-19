import React from 'react'

type CounterState = {
  count: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'incrementByAmount'; payload: number }
  | { type: 'incrementIfOdd' }
  | { type: 'reset' }

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }
    case 'decrement': {
      return { count: state.count - 1 }
    }
    case 'incrementByAmount': {
      return { count: state.count + action.payload }
    }
    case 'incrementIfOdd': {
      if (state.count % 2 === 1) {
        return { count: state.count + 1 }
      } else {
        return state
      }
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
  const [state, dispatch] = React.useReducer(counterReducer, undefined, init)
  const [incrementAmount, setIncrementAmount] = React.useState(2)

  const increment = () => dispatch({ type: 'increment' })
  const decrement = () => dispatch({ type: 'decrement' })
  const incrementByAmount = () =>
    dispatch({ type: 'incrementByAmount', payload: incrementAmount })
  const incrementAsync = () => setTimeout(() => dispatch({ type: 'increment' }), 1000)
  const incrementIfOdd = () => dispatch({ type: 'incrementIfOdd' })
  const reset = () => dispatch({ type: 'reset' })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button aria-label='Decrement value' onClick={decrement}>
          -
        </button>
        <span style={{ padding: '0 8px' }}>{state.count}</span>
        <button aria-label='Increment value' onClick={increment}>
          +
        </button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{ width: 40 }}
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(Number(e.target.value))}
        />
        <button onClick={incrementByAmount}>Add Amount</button>
        <button onClick={incrementAsync}>Add Async</button>
        <button onClick={incrementIfOdd}>Add If Odd</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

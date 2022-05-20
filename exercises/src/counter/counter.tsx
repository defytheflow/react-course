import React from 'react'

// FIXME:

// incrementAmount and count initial values can be passed as props.
// incrementAmount must also be reset to initialValue on dispatch({ type: 'reset' })
// entering non numeric input into incrementAmount breaks everything, fix it

export default function Counter({
  initialCount = 5,
  initialIncrementAmount = 2,
}: {
  initialCount?: number
  initialIncrementAmount?: number
}) {
  const [count, setCount] = React.useState(initialCount)
  const [incrementAmount, setIncrementAmount] = React.useState(initialIncrementAmount)

  const increment = () => setCount(prevCount => prevCount + 1)
  const decrement = () => setCount(prevCount => prevCount - 1)

  const incrementByAmount = () => setCount(prevCount => prevCount + incrementAmount)
  const incrementAsync = () => setTimeout(increment, 1000)

  function reset() {
    setCount(initialCount)
    setIncrementAmount(initialIncrementAmount)
  }

  function handleIncrementAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numValue = Number(e.target.value)
    if (!Number.isNaN(numValue)) {
      setIncrementAmount(numValue)
    }
  }

  return (
    <div>
      <h2>Counter</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button aria-label='Decrement value' onClick={decrement}>
          -
        </button>
        <span style={{ padding: '0 8px' }}>{count}</span>
        <button aria-label='Increment value' onClick={increment}>
          +
        </button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{ width: 40 }}
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={handleIncrementAmountChange}
        />
        <button onClick={incrementByAmount}>Add Amount</button>
        <button onClick={incrementAsync}>Add Async</button>
        <button onClick={count % 2 === 1 ? increment : undefined}>Add If Odd</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

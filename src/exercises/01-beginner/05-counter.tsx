import React from 'react'

export default function CounterApp() {
  return <Counter initialCount={5} />
}

function Counter({
  initialCount = 0,
  initialIncrementAmount = 2,
}: {
  initialCount?: number
  initialIncrementAmount?: number
}) {
  const [count, setCount] = React.useState(initialCount)
  const [incrementAmount, setIncrementAmount] = React.useState(initialIncrementAmount)
  const [pending, setPending] = React.useState(0)

  const previousCount = usePrevious(count)

  const increment = () => setCount(prevCount => prevCount + 1)
  const decrement = () => setCount(prevCount => prevCount - 1)

  const incrementByAmount = () => setCount(prevCount => prevCount + incrementAmount)
  const incrementAsync = () => setTimeout(increment, 1000)

  function incrementIfOdd() {
    setCount(prevCount => (prevCount % 2 === 1 ? prevCount + 1 : prevCount))
  }

  function incrementTriple() {
    increment()
    increment()
    increment()
  }

  async function incrementPending() {
    setPending(prevPending => prevPending + 1)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setPending(prevPending => prevPending - 1)
    increment()
  }

  function reset() {
    setCount(initialCount)
    setIncrementAmount(initialIncrementAmount)
  }

  function handleIncrementAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numValue = Number(e.target.value)
    if (!Number.isNaN(numValue)) setIncrementAmount(numValue)
  }

  return (
    <div>
      <div>Previous: {previousCount}</div>
      <div>Pending: {pending}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button aria-label='Decrement value' onClick={decrement}>
          -
        </button>
        <strong style={{ padding: '0 8px' }}>{count}</strong>
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
        <button onClick={incrementAsync}>Increment Async</button>
        <button onClick={incrementIfOdd}>Increment If Odd</button>
        <button onClick={reset}>Reset</button>
        {/* Must be done using three separate useState() calls */}
        <button aria-label='Increment 3 times' onClick={incrementTriple}>
          +3
        </button>
        <button onClick={incrementPending}>Increment pending</button>
      </div>
    </div>
  )
}

function usePrevious<T>(value: T): T | null {
  const valueRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef.current
}

import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import withTitle from '../../utils/with-title'

function BuggyCounterApp() {
  const [key, setKey] = React.useState(0)

  return (
    <ErrorBoundary
      key={key}
      FallbackComponent={ErrorFallback}
      onReset={() => setKey(prevKey => prevKey + 1)}
    >
      <BuggyCounter />
    </ErrorBoundary>
  )
}

function BuggyCounter() {
  const [count, setCount] = React.useState(0)
  const handleClick = () => setCount(prevCount => prevCount + 1)

  if (count === 5) {
    // Simulate a JS error
    throw new Error('I crashed!')
  }

  return (
    <div>
      <strong>{count}</strong>
      <button onClick={handleClick} style={{ marginLeft: 2 }}>
        Increment
      </button>
    </div>
  )
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reset</button>
    </div>
  )
}

export default withTitle(BuggyCounterApp, 'Buggy Counter')

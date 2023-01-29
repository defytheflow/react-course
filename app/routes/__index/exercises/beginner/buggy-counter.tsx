import React from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

export default function BuggyCounterApp() {
  const [key, setKey] = React.useState(0);
  const handleReset = () => setKey(prevKey => prevKey + 1);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      resetKeys={[key]}
    >
      <BuggyCounter />
    </ErrorBoundary>
  );
}

function BuggyCounter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);

  if (count === 5) {
    throw new Error("I crashed!"); // Simulate a JS error
  }

  return (
    <div>
      <strong>{count}</strong>
      <button onClick={increment} style={{ marginLeft: 2 }}>
        Increment
      </button>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      {/* Show how "role='alert'" drastically improves experience with VoiceOver! */}
      There was an error:
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

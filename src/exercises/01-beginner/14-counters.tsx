// https://beta.reactjs.org/learn
import React from 'react'

export default function CountersApp() {
  return (
    <div>
      <SeparateCounters />
      <hr />
      <SharedCounters />
    </div>
  )
}

function SeparateCounters() {
  return (
    <>
      <h2>Counters that update separately</h2>
      <div style={{ display: 'flex', gap: 5 }}>
        <Button />
        <Button />
      </div>
    </>
  )
}

function Button() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(prevCount => prevCount + 1)

  return (
    <button onClick={increment}>
      Clicked: <b>{count}</b>
    </button>
  )
}

function SharedCounters() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(prevCount => prevCount + 1)

  return (
    <>
      <h2>Counters that update together</h2>
      <div style={{ display: 'flex', gap: 5 }}>
        <Button2 count={count} onClick={increment} />
        <Button2 count={count} onClick={increment} />
      </div>
    </>
  )
}

function Button2({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      Clicked: <b>{count}</b>
    </button>
  )
}

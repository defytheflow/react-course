import React from 'react'

// https://reactjs.org/docs/state-and-lifecycle.html
export default function Clock() {
  const date = useDate()
  return <h1>{date.toLocaleTimeString()}</h1>
}

function useDate() {
  const [date, setDate] = React.useState(() => new Date())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return date
}

import React from 'react'

export default function Timer() {
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState<boolean | null>(null)
  const activeTimerRef = React.useRef<number | null>(null)
  const intervalRef = React.useRef<NodeJS.Timer | null>(null)

  React.useEffect(() => {
    return removeInterval
  }, [])

  function start(n: number) {
    activeTimerRef.current = n
    removeInterval()
    setTimeLeft(n)
    setIsPaused(false)
    startInterval()
  }

  function cancel() {
    activeTimerRef.current = null
    removeInterval()
    setTimeLeft(0)
    setIsPaused(false)
  }

  function pause() {
    removeInterval()
    setIsPaused(true)
  }

  function resume() {
    startInterval()
    setIsPaused(false)
  }

  function reset() {
    removeInterval()
    setTimeLeft(activeTimerRef.current!)
    startInterval()
  }

  function startInterval() {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          removeInterval()
          intervalRef.current = null
          activeTimerRef.current = null
          return prevTime
        } else {
          return prevTime - 1
        }
      })
    }, 1000)
  }

  function removeInterval() {
    clearInterval(intervalRef.current!)
  }

  const timers = [5, 10, 15, 30, 60, 300, 600]
  const timerButtons = timers.map(timer => {
    return (
      <button
        key={timer}
        style={{
          backgroundColor: activeTimerRef.current === timer ? 'limegreen' : undefined,
        }}
        onClick={() => start(timer)}
      >
        {formatTimer(timer)}
      </button>
    )
  })

  const isIdle = intervalRef.current === null

  return (
    <>
      <h2>Timer</h2>
      {timerButtons}
      <div style={{ marginTop: 10 }}>Time left: {formatTimeLeft(timeLeft)}</div>
      <div>
        <input type='range' value={timeLeft} min={0} max={activeTimerRef.current!} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button disabled={isIdle} onClick={isPaused ? resume : pause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button disabled={isIdle} onClick={cancel}>
          Cancel
        </button>
        <button onClick={reset} disabled={isIdle}>
          Reset
        </button>
      </div>
    </>
  )
}

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds - mins * 60

  let format = []
  if (mins) format.push(mins + ' min')
  if (secs) format.push(secs + ' sec')

  return format.join(', ')
}

function formatTimeLeft(timeLeft: number): string {
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft - mins * 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

import React from 'react'

export default function Toggle() {
  const [show, setShow] = React.useState(true)
  const verb = show ? 'Hide' : 'Show'
  const toggle = () => setShow(prevShow => !prevShow)

  return (
    <div>
      <h2>Toggle</h2>
      <button onClick={toggle}>{verb} Element Below</button>
      {show ? <div style={{ marginTop: 5 }}>Toggle Element</div> : null}
    </div>
  )
}

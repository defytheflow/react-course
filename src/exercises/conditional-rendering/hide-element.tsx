import React from 'react'

export default function HideElement() {
  const [show, setShow] = React.useState(true)
  const toggle = () => setShow(prevShow => !prevShow)

  return (
    <div>
      <button onClick={toggle}>{`${show ? 'Hide' : 'Show'} Element Below`}</button>
      {show ? <div style={{ marginTop: 5 }}>Element</div> : null}
    </div>
  )
}

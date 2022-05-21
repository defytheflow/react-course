import React from 'react'
import withTitle from '../../utils/with-title'

function Toggle() {
  const [show, setShow] = React.useState(true)
  const verb = show ? 'Hide' : 'Show'
  const toggle = () => setShow(prevShow => !prevShow)

  return (
    <div>
      <button onClick={toggle}>{verb} Element Below</button>
      {show ? <div style={{ marginTop: 5 }}>Toggle Element</div> : null}
    </div>
  )
}

export default withTitle(Toggle, 'Toggle')

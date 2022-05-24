import React from 'react'

enum LightState {
  OFF = 'off',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

const states = Object.values(LightState)

const colors = {
  [LightState.OFF]: '#000000',
  [LightState.LOW]: '#DECA57',
  [LightState.MEDIUM]: '#FFE338',
  [LightState.HIGH]: '#FFFF00',
}

export default function Light() {
  const [state, setState] = React.useState(LightState.OFF)

  function toggle() {
    const index = states.indexOf(state)
    const nextIndex = (index + 1) % state.length
    setState(states[nextIndex])
  }

  return (
    <div>
      <div>Light - {state}</div>
      <div style={{ backgroundColor: colors[state], width: 100, height: 100 }}></div>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}

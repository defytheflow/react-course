import React from 'react'

enum LightState {
  OFF = 'off',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

type LightAction = { type: 'toggle' }

const states = [LightState.OFF, LightState.LOW, LightState.MEDIUM, LightState.HIGH]

function lightReducer(state: LightState, action: LightAction) {
  switch (action.type) {
    case 'toggle': {
      const index = states.indexOf(state)
      const nextIndex = (index + 1) % state.length
      return states[nextIndex]
    }
    default:
      return state
  }
}

const colors = {
  [LightState.OFF]: '#000',
  [LightState.LOW]: '#DECA57',
  [LightState.MEDIUM]: '#FFE338',
  [LightState.HIGH]: '#FFFF00',
}

export default function Light() {
  const [state, dispatch] = React.useReducer(lightReducer, LightState.OFF)
  return (
    <div>
      <div>Light - {state}</div>
      <div style={{ backgroundColor: colors[state], width: 100, height: 100 }}></div>
      <button onClick={() => dispatch({ type: 'toggle' })}>Click me</button>
    </div>
  )
}

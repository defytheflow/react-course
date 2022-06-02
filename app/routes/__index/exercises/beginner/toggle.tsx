import React from 'react'

export default function ToggleApp() {
  return (
    <div style={{ display: 'flex', gap: 50 }}>
      <LightSwitch initialOn={true} />
      <Light />
    </div>
  )
}

// https://beta.reactjs.org/learn/responding-to-events
function LightSwitch({ initialOn = true }: { initialOn?: boolean }) {
  const [on, setIsOn] = React.useState(initialOn)
  const toggle = () => setIsOn(prevOn => !prevOn)

  React.useEffect(() => {
    document.body.style.backgroundColor = on ? 'white' : 'black'
  }, [on])

  return (
    <div>
      <button onClick={toggle}>{`Turn ${on ? 'off' : 'on'} the lights`}</button>
    </div>
  )
}

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

function Light() {
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

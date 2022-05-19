import React from 'react'

const keys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

type KeypadState = number[]
type KeypadAction = { type: 'enter'; payload: { key: number; passcode: string } }

function keypadReducer(state: KeypadState, action: KeypadAction): KeypadState {
  switch (action.type) {
    case 'enter': {
      const { key, passcode } = action.payload
      const index = state.length // [3]

      if (index === passcode.length) {
        return state
      }

      if (key === Number(passcode[index])) {
        return [...state, key]
      }

      return []
    }
  }
}

export default function Keypad() {
  const passcode = '324881'
  const [state, dispatch] = React.useReducer(keypadReducer, [])

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key.match(/\d+/)) {
        dispatch({ type: 'enter', payload: { key: Number(e.key), passcode } })
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <div>
      {keys.map((row, i) => (
        <div key={i}>
          {row.map(n => (
            <button
              key={n}
              onClick={() => dispatch({ type: 'enter', payload: { key: n, passcode } })}
            >
              {n}
            </button>
          ))}
        </div>
      ))}

      <div>Status: {'[ ' + state.map(() => '✓') + ' ]'}</div>
      {state.join('') === passcode ? <div>Unlocked</div> : <div>Locked</div>}
    </div>
  )
}

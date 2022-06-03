import React from 'react'

export default function HideElement() {
  const [show, toggle] = useToggle(true)
  return (
    <div>
      <button onClick={toggle}>{`${show ? 'Hide' : 'Show'} Element Below`}</button>
      {show && (
        <div style={{ marginTop: 5, backgroundColor: 'royalblue', textAlign: 'center' }}>
          Element
        </div>
      )}
    </div>
  )
}

function useToggle(initialValue: boolean): [boolean, <T = boolean>(value?: T) => void] {
  const [value, setValue] = React.useState(initialValue)

  function toggleValue<T = boolean>(value?: T) {
    if (typeof value === 'boolean') {
      setValue(value)
    } else {
      setValue(prevValue => !prevValue)
    }
  }

  return [value, React.useCallback(toggleValue, [])]
}

import React from 'react'

export default function useToggle(
  initialValue: boolean
): [boolean, <T = boolean>(value?: T) => void] {
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

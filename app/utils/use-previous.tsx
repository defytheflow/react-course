import React from 'react'

export default function usePrevious<T>(value: T): T | null {
  const valueRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef.current
}

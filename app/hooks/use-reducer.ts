import React from 'react'

export function useReducer<S, A>(
  reducer: React.Reducer<S, A>,
  initialState: S
): [S, React.Dispatch<A>] {
  const [state, setState] = React.useState(initialState)
  const reducerRef = React.useRef(reducer)

  React.useEffect(() => {
    reducerRef.current = reducer
  }, [reducer])

  const dispatch = React.useCallback((action: A) => {
    setState(prevState => reducerRef.current(prevState, action))
  }, [])

  return [state, dispatch]
}

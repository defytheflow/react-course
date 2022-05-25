import React from 'react'

// TODO: dispatch identity must be the same
// What happens if a reducer function changes between rerenders? Is it recreated every time?
// or is it closed over on the mount? Hence Can I use props inside reducer, and do they update?
export function useReducer<S, A>(
  reducer: React.Reducer<S, A>,
  initialState: S
): [S, React.Dispatch<A>] {
  const [state, setState] = React.useState(initialState)

  function dispatch(action: A) {
    setState(prevState => reducer(prevState, action))
  }

  return [state, dispatch]
}

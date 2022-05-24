import React from 'react'

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

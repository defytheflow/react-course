import React from 'react'

// https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer
/*
  Interestingly enough, React actually builds `useState` out of the same code that's used
  to build `useReducer`. They do this because managing a single value of state in a
  component is very common, but doing that with `useReducer` would require a bit of
  boilerplate. So they reduce the boilerplate by exposing a simpler state management API
  through `useState`.
*/
// TODO: how to define reducer and initializer functions outside of useState and still make typescript happy?
// Is there a way to highlight 'markdown' comments inside vscode inside typescript code?
// Or mark something as bold and stuff?
export function useState<S>(
  initialState: S
): [S, React.Dispatch<React.SetStateAction<S>>] {
  function useStateReducer(prevState: S, newState: React.SetStateAction<S>): S {
    return newState instanceof Function ? newState(prevState) : newState
  }

  function useStateInitializer(initialState: S | (() => S)): S {
    return initialState instanceof Function ? initialState() : initialState
  }

  return React.useReducer(useStateReducer, initialState, useStateInitializer)
}

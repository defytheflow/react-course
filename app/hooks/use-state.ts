import React from "react";

/*
  Implement useState with useReducer.
  https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer

  Interestingly enough, React actually builds `useState` out of the same code that's used
  to build `useReducer`. They do this because managing a single value of state in a
  component is very common, but doing that with `useReducer` would require a bit of
  boilerplate. So they reduce the boilerplate by exposing a simpler state management API
  through `useState`.
*/

function useStateReducer<S>(prevState: S, newState: React.SetStateAction<S>): S {
  return newState instanceof Function ? newState(prevState) : newState;
}

function initializer<S>(initialState: S | (() => S)): S {
  return initialState instanceof Function ? initialState() : initialState;
}

export function useState<S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const typedReducer = useStateReducer as React.Reducer<S, React.SetStateAction<S>>;
  return React.useReducer(typedReducer, initialState, initializer);
}

function useLegacyStateReducer<S>(prevState: S, newState: React.SetStateAction<S>): S {
  return { ...prevState, ...useStateReducer(prevState, newState) };
}

export function useLegacyState<S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<Partial<S>>>] {
  // prettier-ignore
  const typedReducer = useLegacyStateReducer as React.Reducer<S, React.SetStateAction<Partial<S>>>
  return React.useReducer(typedReducer, initialState, initializer);
}

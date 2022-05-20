The Effect Hook lets you perform side effects in function components.

“The question is not ‘when does this effect run,’ the question is ‘with which state does this effect synchronize with?’ “
– Ryan Florence

Effects _do not block the UI_ because they run asynchronously.

## Examples of effects

- Fetching data
- Setting up a subscription
- Manually changing the DOM
- Registering and deregistering event listeners
- Reading from local storage
- Logging

There are two common kinds of side effects in React components: those that don't require
cleanup, and those that do.

## Effects without Cleanup

Sometimes, we want to **run some additional code after React has updated the DOM**.
Network requests, manual DOM mutations, and logging are common examples of effects that
don't require a cleanup.

We typically want to perform our effects after React has updated the DOM.

In many cases we want to perform the same side effect regardless of whether the component
just mounted, or it has been updated. Conceptually, we want it to happen after every
render.

By using this hook, you tell React that your component needs to do something after render.
React will remember the function you passed, and call it later after performing DOM
updates.

Instead of thinking in terms of "mounting" and "updating", you might find it easier to
think that effects happen "after render". React guarantees the DOM has been updated by the
time it runs the effect.

Every time we rerender, we schedule a _different_ effect, replacing the previous one.
Each effect "belongs" to a particular render.

## Effects with Cleanup

Every effect may return a function that cleans up after it. This lets us keep the logic
for adding and removing subscriptions close to each other. They're part of the same
effect.

React performs the cleanup when the component unmounts. React _also_ cleans up effects
from previous render before running the effect next time.

## Tip: Use Multiple Effects to Separate Concerns

You can use several effects, this lets you separate unrelated logic into different
effects. React will apply every effect used by the component, in the order they were
specified.

## Tip: Optimizing Performance by Skipping Effects

In some cases, cleaning up or applying the effect after every render might create a
performance problem.

You can tell React to skip applying an effect if certain values haven't changed between
re-renders. To do so, pass an array as an optional second argument.

An effect is only rerun if at least one of the values specified as part of the effect's dependencies has changed since the last render.

## What is a side-effect?

A functional React component uses props and/or state to calculate the output. If the
functional component makes calculations that don't target the output value, then these
calculations are named _side-effects_.

## Recommendations for working with functions when used with effects

- Hoist functions that don't need any value of the component scope outside of your component
- Move functions that use values of the component scope that are used only by an effect inside of that effect.
- If after that your effect still ends up using functions defined outside of the effect within the component, wrap them into `useCallback` statements where they are defined.

## References

- [React Docs](https://reactjs.org/docs/hooks-effect.html)
- [Log Rocket Blog](https://blog.logrocket.com/guide-to-react-useeffect-hook/)

The difference between `useEffect` and `useLayoutEffect` lies solely in when the two are fired.

`useEffect` runs _asynchronously_ and after a render is painted to the screen

1. You cause a render somehow (change state, or the parent re-renders)
2. React renders your component (calls it)
3. The screen is visually updated
4. Then `useEffect` runs

`useLayoutEffect` runs _synchronously_ after a render but before the screen is painted

1. You cause a render somehow (change state, or the parent re-renders)
2. React renders your component (calls it)
3. `useLayoutEffect` runs, and React waits for it to finish.
4. The screen is visually updated

If your effect is mutating the DOM, then the user will see a flicker of content.

If your component is flickering when state is updated - as in, it renders in a
partially-ready state first and then immediately re-renders in its final state - that's a good clue that it's time to swap in `useLayoutEffect`.

https://daveceddia.com/useeffect-vs-uselayouteffect/

### **References**

- [Dave Ceddia Blog](https://daveceddia.com/useeffect-vs-uselayouteffect/)
- [Web Dev Simplified Youtube](https://www.youtube.com/watch?v=wU57kvYOxT4)

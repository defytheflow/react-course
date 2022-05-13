# Render Props

The term "render prop" refers to a technique for sharing code between React components
using a prop whose value is a function.

A component with a render prop takes a function that returns a React element
and calls it instead of implementing its own render logic.

```js
<DataProvider render={data => <h1>Hello, {data.target}</h1>} />
```

**A render prop is a function prop that a component uses to know what to render.**

Render props allow you to define a complex component and expose dynamic abilities.

## Using Props Other Than `render`

It's important to remember that just because the pattern is called "render props" you
don't have to use a prop named `render` to use this pattern. In fact, **any** prop that is
a function that a component uses to know what to render is technically a "render prop".

We could just as easily use the `children` prop!

```js
<DataProvider children={data => <h1>Hello, {data.target}</h1>} />
```

And remember, the `children` prop doesn't actually need to be named in the list of
"attributes" in your JSX element. Instead, you can put it directly **inside** the element!

<!-- prettier-ignore -->
```js
<DataProvider>
  {data => (
    <h1>Hello, {data.target}</h1>
  )}
</DataProvider>
```

## References

- [React Docs](https://reactjs.org/docs/render-props.html)

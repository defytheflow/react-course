# React Interview Questions

## Beginner

0. What is a Single-page Application?

1. What is a compiler? What is a bundler? What is a package manager?

2. What is React? Why use it?

   - simplicity - state, components, jsx
   - performance - virtual dom

3. What is JSX?

4. What is a React element? What is a React component?

   - When do you decide to extract a component?

     - readability
     - state
     - reusability
     - performance/efficiency

   - How many React elements can a component return? Why can we only return one React
     element from a React component?

5. What is props? Why is it immutable? What would happen if it was mutable? What React
   concept would break?

   - What is a `children` prop?

6. What is state? How to update state?

   - How do you share state between sibling components?

7. What is the difference between state and props?

8. What is an event handler? How to define them in React?

9. What are Lifecycle Methods? What is component lifecycle? What stages does it consist
   of? How to run code during these stages? How to implement them in class vs function
   components?

10. What is a Controlled component? What is an Uncontrolled component? What is the difference?
    When should you use one or another?

11. What is a `key` prop? Why do we need to include it when creating an array of
    React elements?

12. What is a `ref` prop?

13. What is a `<React.Fragment />`?

14. How to style a React Component?

    - inline styles
    - class name
    - simple css file
    - css module
    - css in js
    - styled components

15. What can be rendered by React? What can you return from a function component? What is
    a valid return, that react knows how to render?
    - string
    - number
    - boolean
    - null
    - undefined
    - react element

---

## Intermediate

0. What is Context?

   - How to use it inside class components?
   - How to use it inside function components with hooks?

1. What is an Error Boundary?

   - How to catch an error inside an event handler?

2. What is a Higher-Order Component?

3. What is Render Props?

4. What is Code Splitting? How to perform it in React? What is `React.lazy()`?

5. What is `<React.StrictMode />`?

6. What is a `React.PureComponent`?

   - How to implement it inside functional components? (`React.memo()`)

7. What is state updates batching? How does it work?

8. What is CSS-in-JS?

---

## Advanced

0. What is Reconciliation?
   **Reconciliation** is the process of syncing the virtual dom with the real dom.

   - What is the Virtual DOM?
   - What is the Reconciliation (Diffing) Algorithm?

1. What is React Fiber?

---

## Hooks

1. What are hooks and why use them? Why were they added? What problems do they solve?

   - simplicity - no classes, everything is a function.

2. What are the rules that must be followed while using hooks?

3. What is the use of `useEffect()` hook?

4. What is the use of `useMemo()` hook?

5. When do you use the functional update form of setState?

6. What are custom hooks?

7. How does React associate hook calls with components?

---

## React Router

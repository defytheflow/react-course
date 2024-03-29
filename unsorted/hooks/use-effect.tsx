/**
 * 1. Update the document's title every time a piece of state changes.
 * Example from: https://reactjs.org/docs/hooks-effect.html
 */
function DocumentTitle() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Click me</button>
    </div>
  );
}

/**
 * 2. Focus an input on the first render.
 */
function FocusInput() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

/**
 * 3. Fetch data on the first render and display it.
 */

/**
 * 4. Display the current window's width.
 */
function WindowWidth() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize(e: UIEvent) {
      const { width } = document.body.getBoundingClientRect();
      setWidth(Math.ceil(width));
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <h1>The window width is {width} pixels</h1>;
}

/**
 * 5. Display a counter, that increases by one every second or a clock.
 */

/**
 * 6. Log to console 'Mounted', 'Unmounted', 'Prop changed to' and 'State changed to'.
 */
function LifeCycleExample() {
  const [state, setState] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(true);

  return (
    <div>
      {isMounted && <LifeCycle prop={state} />}
      <button onClick={() => setState(p => p + 1)}>Update Prop</button>
      <button onClick={() => setIsMounted(false)}>Unmount</button>
    </div>
  );
}

function LifeCycle({ prop }: { prop: any }) {
  const [state, setState] = React.useState(0);
  const mountedRef = React.useRef([false, false]);

  React.useEffect(() => {
    console.log(`Mounted. State is ${state}. Prop is ${prop}`);
    return () => {
      console.log("Unmounted");
    };
  }, []);

  React.useEffect(() => {
    if (mountedRef.current[0]) {
      console.log(`State updated to ${state}`);
    } else {
      mountedRef.current[0] = true;
    }
  }, [state]);

  React.useEffect(() => {
    if (mountedRef.current[1]) {
      console.log(`Prop updated to ${prop}`);
    } else {
      mountedRef.current[1] = true;
    }
  }, [prop]);

  return (
    <div>
      <button onClick={() => setState(prev => prev + 1)}>Update State</button>
    </div>
  );
}

/**
 * 7. Display current and previous value of a state.
 */

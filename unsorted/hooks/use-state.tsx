/**
 * 1. Demonstrate usage of functional way to update the state. Fix stale closure bug.
 * Example from: https://dmitripavlutin.com/react-hooks-stale-closures/
 */
function DelayedCount() {
  const [count, setCount] = React.useState(0);

  function handleClickAsync() {
    setTimeout(() => {
      // setCount(count + 1) <- Bug this way.
      setCount(prev => prev + 1);
    }, 1000);
  }

  return (
    <div>
      Count: {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}

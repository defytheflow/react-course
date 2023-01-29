function Ex0() {
  return (
    <>
      {/* All these JSX expressions render an empty div. */}
      <div />
      <div></div>
      <div>{true}</div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
    </>
  );
}

function Ex1() {
  return (
    <>
      {/* All these JSX expressions render strings. */}
      <div>{String(true)}</div>
      <div>{String(false)}</div>
      <div>{String(null)}</div>
      <div>{String(undefined)}</div>
    </>
  );
}

export { Ex0, Ex1 };

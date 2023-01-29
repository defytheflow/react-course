function Repeat({
  times,
  children,
}: {
  times: number;
  children: (i: number) => React.ReactNode;
}) {
  const items = Array.from({ length: times }, (_, i) => children(i));
  return <div>{items}</div>;
}

function RepeatEx() {
  return (
    <Repeat times={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

export { RepeatEx };

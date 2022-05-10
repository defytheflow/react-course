function Clock() {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{date.toLocaleTimeString()}</div>;
}

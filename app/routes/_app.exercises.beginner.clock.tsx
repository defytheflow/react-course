import React from "react";

export default function Clock() {
  const date = useDate();
  return (
    <div className="font-semibold" role="timer" aria-live="polite">
      {date.toLocaleTimeString()}
    </div>
  );
}

function useDate() {
  const [date, setDate] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 3000);
    return () => clearInterval(id);
  }, []);

  return date;
}

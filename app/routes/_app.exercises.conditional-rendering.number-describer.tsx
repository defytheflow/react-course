import React from "react";

export default function NumberDescriberApp() {
  const [number, setNumber] = React.useState(4);

  function setRandomNumber() {
    const newNumber = Math.round(Math.random() * 101);
    setNumber(newNumber);
  }

  return (
    <div>
      <NumberDescriber number={number} />
      <button onClick={setRandomNumber}>New random number</button>
    </div>
  );
}

// https://reactjs.org/docs/jsx-in-depth.html
function NumberDescriber({ number }: { number: number }) {
  let description;

  if (number % 2 === 0) {
    description = <b>even</b>;
  } else {
    description = <i>odd</i>;
  }

  return (
    <div>
      {number} is an {description} number
    </div>
  );
}

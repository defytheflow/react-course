// somewhere from react or kentcdodds -> find out, it is a good example.

export default function NumberApp() {
  return (
    <div>
      <NumberDescriber number={4} />
      <NumberDescriber number={-1} />
    </div>
  )
}

function NumberDescriber({ number }: { number: number }) {
  let description

  if (number % 2 === 0) {
    description = <b>even</b>
  } else {
    description = <i>odd</i>
  }

  return (
    <div>
      {number} is an {description} number
    </div>
  )
}

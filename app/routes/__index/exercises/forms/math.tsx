import React from "react";

const operators = ["+", "-", "×", "÷"] as const;
type Operator = (typeof operators)[number];

export default function Mathematics() {
  const [number1, setNumber1] = React.useState<number | undefined>();
  const [number2, setNumber2] = React.useState<number | undefined>();
  const [operator, setOperator] = React.useState<Operator>(operators[0]);
  const [result, setResult] = React.useState<number | undefined>();

  return (
    <form>
      <input
        aria-label="First number"
        type="number"
        onChange={e => setNumber1(Number(e.target.value))}
      />
      <select
        aria-label="Select operator"
        style={{ margin: "0 8px" }}
        value={operator}
        onChange={e => setOperator(e.target.value as Operator)}
      >
        {operators.map(operator => (
          <option key={operator} value={operator}>
            {operator}
          </option>
        ))}
      </select>
      <input
        aria-label="Second number"
        type="number"
        onChange={e => setNumber2(Number(e.target.value))}
      />{" "}
      = {formatResult(result)}
      <div style={{ marginTop: 5 }}>
        <button onClick={() => setResult(calculateResult(number1, number2, operator))}>
          Calculate
        </button>
      </div>
    </form>
  );
}

type MathFunc = (a: number, b: number) => number;

const operations: Record<Operator, MathFunc> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function calculateResult(a?: number, b?: number, operator?: Operator) {
  if (a !== undefined && b !== undefined && operator !== undefined) {
    return operations[operator](a, b);
  }
}

function formatResult(result?: number) {
  if (result !== undefined) {
    return Number.isInteger(result) ? result : result.toFixed(2);
  }
}

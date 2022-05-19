import React from 'react'

type SquareValue = 'X' | 'O' | null

const initialHistory: Array<{ squares: SquareValue[] }> = [
  { squares: Array(9).fill(null) },
]

export default function Game() {
  const [history, setHistory] = React.useState(initialHistory)
  const [currentStep, setCurrentStep] = React.useState(0)

  function handleClick(i: number) {
    const newHistory = history.slice(0, currentStep + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (squares[i] || calculateWinner(squares)[0]) {
      return
    }
    squares[i] = calculateNext(squares)

    setHistory(newHistory.concat({ squares }))
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory(initialHistory)
    setCurrentStep(0)
  }

  function jump(i: number) {
    setCurrentStep(i)
  }

  const current = history[currentStep]
  const next = calculateNext(current.squares)
  const [winner, winnerRow] = calculateWinner(current.squares)
  const status = calculateStatus(winner, current.squares, next)

  const moves = history.map((step, i) => {
    const label = i ? 'Go to move #' + (i + 1) : 'Go to game start'
    const isCurrentStep = currentStep === i
    return (
      <li key={i}>
        <button disabled={isCurrentStep} onClick={() => jump(i)}>
          {label} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div>
      <div>{status}</div>
      <Board squares={current.squares} winnerRow={winnerRow} onClick={handleClick} />
      <ol>{moves}</ol>
      <button
        disabled={history.length <= 1}
        style={{ marginTop: 10, marginLeft: 43 }}
        onClick={restart}
      >
        Restart
      </button>
    </div>
  )
}

function Board({
  squares,
  winnerRow,
  onClick,
}: {
  squares: SquareValue[]
  winnerRow: number[]
  onClick: (i: number) => void
}) {
  return (
    <div
      className='board'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 50px)',
        gridTemplateRows: 'repeat(3, 50px)',
        gap: 1,
      }}
    >
      {squares.map((square, i) => (
        <Square
          key={i}
          value={squares[i]}
          onClick={() => onClick(i)}
          isWinner={winnerRow.includes(i)}
        />
      ))}
    </div>
  )
}

function Square({
  value,
  isWinner,
  onClick,
}: {
  value: SquareValue
  isWinner: boolean
  onClick: () => void
}) {
  return (
    <button className={isWinner ? 'square-winner ' : undefined} onClick={onClick}>
      {value}
    </button>
  )
}

function calculateWinner(squares: SquareValue[]): [SquareValue, number[]] {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]]
    }
  }

  return [null, []]
}

function calculateStatus(
  winner: SquareValue,
  squares: SquareValue[],
  next: NonNullable<SquareValue>
) {
  return winner
    ? `Winner : ${winner}`
    : squares.every(Boolean)
    ? 'Draw'
    : `Next player: ${next}`
}

function calculateNext(squares: SquareValue[]) {
  return squares.filter(Boolean).length % 2 == 0 ? 'X' : 'O'
}

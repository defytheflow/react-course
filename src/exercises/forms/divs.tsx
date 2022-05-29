// Idea from here: https://github.com/rithmschool/react_exercises/blob/master/03-events-forms-refs-life-cycle/forms-and-refs/readme.md
import React from 'react'

import Button from '../../utils/button'

type DivType = Readonly<{
  width: string
  height: string
  color: string
}>

export default function Divs() {
  const [divs, setDivs] = React.useState<DivType[]>([])

  const [width, setWidth] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [color, setColor] = React.useState('black')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDivs(prevDivs => [...prevDivs, { width, height, color }])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Width{' '}
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            name='width'
            onChange={e => setWidth(e.target.value)}
          />
        </label>
        <br />
        <label>
          Height{' '}
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            name='height'
            onChange={e => setHeight(e.target.value)}
          />
        </label>
        <br />
        <label>
          Color
          <input
            type='color'
            name='color'
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </label>
        <br />
        <Button type='submit' disabled={![width, height, color].every(Boolean)}>
          Add
        </Button>
      </form>
      <ul>
        {divs.map((div, index) => (
          <li key={index}>
            <div
              style={{ width: div.width, height: div.height, backgroundColor: div.color }}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

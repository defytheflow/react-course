// https://github.com/kentcdodds/react-fundamentals
import React from 'react'
import Button from '~/utils/button'

type ItemType = Readonly<{
  id: string
  value: string
}>

const allItems: ItemType[] = [
  { id: 'apple', value: '🍎 apple' },
  { id: 'orange', value: '🍊 orange' },
  { id: 'grape', value: '🍇 grape' },
  { id: 'pear', value: '🍐 pear' },
]

export default function Fruits() {
  const [items, setItems] = React.useState(allItems)

  function addItem() {
    const itemIds = items.map(i => i.id)
    setItems(prevItems => [...prevItems, allItems.find(i => !itemIds.includes(i.id))!])
  }

  function removeItem(item: ItemType) {
    setItems(prevItems => prevItems.filter(i => i.id !== item.id))
  }

  return (
    <div>
      <div className='keys'>
        <Button disabled={items.length >= allItems.length} onClick={addItem}>
          add item
        </Button>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {items.map(item => (
            <li key={item.id}>
              {/* Try removing a key or using index as a key and removing items from the start. */}
              <button onClick={() => removeItem(item)}>remove</button>{' '}
              <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
              <input id={`${item.id}-input`} defaultValue={item.value} />
              {/* Or clear the defaultValue and try entering values yourself and then removing items from the start. */}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <ShuffleFruits />
    </div>
  )
}

function ShuffleFruits() {
  const [items, setItems] = React.useState(allItems)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setItems(shuffle)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Try to focus an input and see what happens. */}
      <div>
        <h1>Without Key</h1>
        {items.map(item => (
          <input value={item.value} />
        ))}
      </div>
      {/* Try to focus an input and see what happens. */}
      <div>
        <h1>With Key as Index</h1>
        {items.map((item, index) => (
          <input key={index} value={item.value} />
        ))}
      </div>
      {/* Try to focus an input and see what happens. */}
      <div>
        <h1>With Key</h1>
        {items.map(item => (
          <input key={item.id} value={item.value} />
        ))}
      </div>
    </div>
  )
}

// TODO: lookup a better way to shuffle an array, that is stable and clear, understand it completely

// function shuffle<T>(array: readonly T[]): T[] {
//   const newArray = [...array]

//   for (let i = 0, len = newArray.length; i < len; i++) {
//     const j = Math.floor(Math.random() * (i + 1))
//     const tmp = newArray[i]
//     newArray[i] = newArray[j]
//     newArray[j] = tmp
//   }

//   return newArray
// }

function shuffle<T>(array: readonly T[]): T[] {
  const newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = tmp
  }

  return newArray
}

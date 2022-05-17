import React from 'react'

type Item = {
  id: number
  value: string
}

const allItems: Item[] = [
  { id: 1, value: 'apple' },
  { id: 2, value: 'orange' },
  { id: 3, value: 'grape' },
  { id: 4, value: 'pear' },
]

export default function Demo() {
  return (
    <div>
      <App />
      <hr />
      <FocusDemo />
    </div>
  )
}

function App() {
  const [items, setItems] = React.useState<Item[]>(allItems)

  function addItem() {
    setItems([...items, allItems.find(i => !items.includes(i))!])
  }

  function removeItem(item: Item) {
    setItems(items.filter(i => i !== item))
  }

  return (
    <div>
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {items.map(item => (
          <li>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.value}-input`}>{item.value}</label>{' '}
            <input id={`${item.value}-input`} defaultValue={item.value} />
            {/* Or clear the defaultValue and try entering values yourself and then removing items. */}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FocusDemo() {
  const [items, setItems] = React.useState([
    { id: 1, value: 'apple' },
    { id: 2, value: 'orange' },
    { id: 3, value: 'grape' },
    { id: 4, value: 'pear' },
  ])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setItems(shuffle(items))
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <div>
        <h1>Without Key</h1>
        {items.map(item => (
          <input value={item.value} />
        ))}
      </div>
      <div>
        <h1>With Key as Index</h1>
        {items.map((item, index) => (
          <input key={index} value={item.value} />
        ))}
      </div>
      <div>
        <h1>With Key</h1>
        {items.map(item => (
          <input key={item.id} value={item.value} />
        ))}
      </div>
    </div>
  )
}

function shuffle<T>(originalArray: readonly T[]): T[] {
  const arr = originalArray.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

// https://github.com/kentcdodds/react-fundamentals
import React from 'react'
import Button from '../../utils/button'

type ItemType = {
  id: string
  value: string
}

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
  )
}

// function FocusDemo() {
//   const [items, setItems] = React.useState([
//     { id: 1, value: 'apple' },
//     { id: 2, value: 'orange' },
//     { id: 3, value: 'grape' },
//     { id: 4, value: 'pear' },
//   ])

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setItems(shuffle(items))
//     }, 1000)
//     return () => clearInterval(interval)
//   })

//   return (
//     <div>
//       <div>
//         <h1>Without Key</h1>
//         {items.map(item => (
//           <input value={item.value} />
//         ))}
//       </div>
//       <div>
//         <h1>With Key as Index</h1>
//         {items.map((item, index) => (
//           <input key={index} value={item.value} />
//         ))}
//       </div>
//       <div>
//         <h1>With Key</h1>
//         {items.map(item => (
//           <input key={item.id} value={item.value} />
//         ))}
//       </div>
//     </div>
//   )
// }

// function shuffle<T>(originalArray: readonly T[]): T[] {
//   const arr = originalArray.slice()
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     const tmp = arr[i]
//     arr[i] = arr[j]
//     arr[j] = tmp
//   }
//   return arr
// }

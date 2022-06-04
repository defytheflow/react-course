import React from 'react'

export default function ArrayOperations() {
  const [
    array,
    // prettier-ignore
    { set, push, unshift, pop, shift, splice, map, filter, remove, insert, update, clear },
  ] = useArray(() => [1, 2, 3, 4, 5, 6])

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 5 }}>
        {'[' + array.join(', ') + ']'}
      </div>
      <div style={{ display: 'flex', gap: 5, flexDirection: 'column' }}>
        <h3>Insert</h3>
        <button onClick={() => push(7)}>Add 7 to End</button>
        <button onClick={() => push(7, 8)}>Add 7, 8 to End</button>
        <button onClick={() => unshift(5)}>Add 5 to Start</button>
        <button onClick={() => unshift(10, 11)}>Add 10, 11 to Start</button>
        <button onClick={() => splice(2, 0, 5)}>Insert 5 as third element</button>
        <button onClick={() => insert(2, 5)}>
          <i>Insert 5 as third element*</i>
        </button>
        <button onClick={() => splice(3, 0, 12, 13, 14)}>
          Insert 12, 13, 14 after third element
        </button>

        <h3>Remove</h3>
        <button onClick={pop}>Remove last element</button>
        <button onClick={shift}>Remove first element</button>
        <button onClick={() => splice(1, 1)}>Remove second element</button>
        <button onClick={() => remove(1)}>
          <i>Remove second element*</i>
        </button>
        <button onClick={() => splice(0, 3)}>Remove first three elements</button>
        <button onClick={() => splice(0)}>Remove all</button>
        <button onClick={clear}>
          <i>Remove all*</i>
        </button>
        <button onClick={() => filter(n => n % 2 === 0)}>Remove odd</button>

        <h3>Update</h3>
        <button onClick={() => splice(2, 1, 9)}>Change third element to 9</button>
        <button onClick={() => update(2, 9)}>
          <i>Change third element to 9*</i>
        </button>
        <button onClick={() => map(n => n * 2)}>Double each element</button>
        <button onClick={() => set([1, 2])}>Set to 1, 2</button>
      </div>
    </div>
  )
}

type NativeArrayFunctions<T> = {
  push: (...items: T[]) => void
  unshift: (...items: T[]) => void
  pop: () => void
  shift: () => void
  splice: {
    (start: number, deleteCount?: number): void
    (start: number, deleteCount: number, ...items: T[]): void
  }
  map: (callback: (value: T) => T) => void
  filter: (predicate: (value: T) => boolean) => void
}

type CustomArrayFunctions<T> = {
  remove: (index: number) => void
  insert: (index: number, value: T) => void
  update: (index: number, value: T) => void
  clear: () => void
}

type UseArrayFunctions<T> = NativeArrayFunctions<T> &
  CustomArrayFunctions<T> & { set: React.Dispatch<React.SetStateAction<T[]>> }

function useArray<T>(initialValue: T[] | (() => T[])): [T[], UseArrayFunctions<T>] {
  const [array, setArray] = React.useState(initialValue)

  function push(...items: T[]) {
    setArray(prevArray => [...prevArray, ...items])
    // setArray(prevArray => prevArray.concat(value))
  }

  function unshift(...items: T[]) {
    setArray(prevArray => [...items, ...prevArray])
  }

  function pop() {
    setArray(prevArray => prevArray.slice(0, -1))
  }

  function shift() {
    setArray(prevArray => prevArray.slice(1))
    // setArray(([, ...prevArray]) => prevArray)
  }

  function splice(start: number, deleteCount?: number, ...items: T[]) {
    setArray(prevArray => {
      if (deleteCount === undefined) {
        return prevArray.slice(0, start)
      }
      return [
        ...prevArray.slice(0, start),
        ...items,
        ...prevArray.slice(start + deleteCount),
      ]
    })
  }

  function map(callback: (value: T) => T) {
    setArray(prevArray => prevArray.map(callback))
  }

  function filter(predicate: (value: T) => boolean) {
    setArray(prevArray => prevArray.filter(predicate))
  }

  function remove(index: number) {
    setArray(prevArray => prevArray.filter((_, i) => i !== index))
    // setArray(prevArray => [...prevArray.slice(0, index), ...prevArray.slice(index + 1)])
  }

  function insert(index: number, value: T) {
    // prettier-ignore
    setArray(prevArray => [...prevArray.slice(0, index), value, ...prevArray.slice(index)])
  }

  function update(index: number, value: T) {
    setArray(prevArray => prevArray.map((v, i) => (i === index ? value : v)))
    // setArray(prevArray => [...prevArray.slice(0, index), value, ...prevArray.slice(index + 1)])
  }

  function clear() {
    setArray([])
  }

  const stableArrayFunctions = {
    set: setArray,
    push: React.useCallback(push, []),
    unshift: React.useCallback(unshift, []),
    pop: React.useCallback(pop, []),
    shift: React.useCallback(shift, []),
    splice: React.useCallback(splice, []),
    map: React.useCallback(map, []),
    filter: React.useCallback(filter, []),
    remove: React.useCallback(remove, []),
    insert: React.useCallback(insert, []),
    update: React.useCallback(update, []),
    clear: React.useCallback(clear, []),
  }

  return [array, stableArrayFunctions]
}

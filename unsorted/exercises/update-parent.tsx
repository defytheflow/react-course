import React from 'react'

export default function Parent() {
  const [value, setValue] = React.useState('I need to be update from my child')

  return (
    <>
      <h2>Update Parent From Child</h2>
      <div>
        <div>Parent</div>
        <div style={{ marginBottom: 20 }}>{value}</div>
        <Child setValue={setValue} />
      </div>
    </>
  )
}

function Child({ setValue }: { setValue: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div>
      <div>Child</div>
      <button onClick={() => setValue('Updated from the child')}>
        Change Parent Value
      </button>
    </div>
  )
}

import React from 'react'

export default function Greeting() {
  const [name, setName] = React.useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Greeting</h2>
      <form>
        <label htmlFor='name'>Name:</label>
        <input id='name' value={name} onChange={handleChange} />
      </form>
      {name ? <strong>Hello, {name}!</strong> : 'Please type your name'}
    </div>
  )
}

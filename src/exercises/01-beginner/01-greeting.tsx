// https://github.com/kentcdodds/react-hooks
import React from 'react'

export default function GreetingApp() {
  return <Greeting initialName='John' />
}

function Greeting({ initialName = '' }: { initialName?: string }) {
  const [name, setName] = React.useState(initialName)

  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input id='name' value={name} onChange={e => setName(e.target.value)} />
      </form>
      {name ? <strong>Hello, {name}!</strong> : 'Please type your name'}
    </div>
  )
}

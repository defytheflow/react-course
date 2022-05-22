// https://github.com/kentcdodds/react-hooks
import React from 'react'
import withTitle from '../../utils/with-title'

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

function GreetingApp() {
  return <Greeting initialName='John' />
}

export default withTitle(GreetingApp, 'Greeting')

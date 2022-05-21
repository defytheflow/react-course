import React from 'react'
import withTitle from '../../utils/with-title'

function Greeting() {
  const [name, setName] = React.useState('')

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

export default withTitle(Greeting, 'Greeting')

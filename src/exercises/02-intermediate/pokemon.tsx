import React from 'react'

export default function PokemonApp() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div>
      <PokemonForm onSubmit={handleSubmit} pokemonName={pokemonName} />{' '}
      <div>
        <ErrorBoundary
          FallbackComponent={PokemonErrorView}
          key={pokemonName}
          onReset={handleReset}
        >
          <PokemonDataView pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

type ErrorBoundaryProps = {
  children: React.ReactNode
  FallbackComponent: any
  onReset: () => void
}

type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { FallbackComponent, children, onReset } = this.props

    if (error) {
      return <FallbackComponent error={error} onReset={onReset} />
    }

    return children
  }
}

function PokemonForm({
  pokemonName: pokemonNameProp,
  onSubmit,
}: {
  pokemonName: string
  onSubmit: (pokemonName: string) => void
}) {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(pokemonName)
  }

  function handleSelect(pokemonName: string) {
    setPokemonName(pokemonName)
    onSubmit(pokemonName)
  }

  React.useEffect(() => {
    if (pokemonNameProp) {
      setPokemonName(pokemonNameProp)
    }
  }, [pokemonNameProp])

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input-search'
        type='text'
        onChange={e => setPokemonName(e.target.value)}
        value={pokemonName}
        placeholder='Which pokemon?'
      />
      <button className='btn-fetch' type='submit' disabled={pokemonName.length === 0}>
        Fetch!
      </button>
      <div className='btn-pokemon'>
        Out of ideas? Try{' '}
        <button
          className='invisible-button'
          type='button'
          onClick={() => handleSelect('pikachu')}
        >
          Pikachu
        </button>
        {', '}
        <button
          className='invisible-button'
          type='button'
          onClick={() => handleSelect('charizard')}
        >
          Charizard
        </button>
        {', or'}
        <button
          className='invisible-button'
          type='button'
          onClick={() => handleSelect('ninetales')}
        >
          Ninetales
        </button>
        .
      </div>
    </form>
  )
}

type Pokemon = {
  name: string
  number: string
  attacks: {
    special: { name: string; type: string; damage: string }[]
  }
  image: string
}

function PokemonDataView({ pokemonName }: { pokemonName: string }) {
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null)
  const [status, setStatus] = React.useState(pokemonName ? 'pending' : 'idle')
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) return
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      },
      error => {
        console.log('FAILURE', error)
        setError(error)
        setStatus('rejected')
      }
    )
  }, [pokemonName])

  const attacks = pokemon ? pokemon.attacks.special : []

  if (error) {
    // this will be handled by ErrorBoundary.
    throw error
  }

  const name =
    status === 'idle'
      ? 'No pokemon Yet! (xxx)'
      : status === 'pending'
      ? `Loading ${pokemonName}`
      : `${pokemon!.name} (${pokemon!.number})`

  const avatar =
    status === 'idle' ? (
      'Please submit a pokemon!'
    ) : status === 'pending' ? (
      <div className='loader'></div>
    ) : (
      <img src={pokemon!.image} />
    )

  const rows =
    status === 'resolved' ? (
      attacks.map(attack => (
        <tr key={attack.name}>
          <td className='pokemon-stats'>{attack.name}</td>
          <td className='pokemon-stats'>{attack.type}</td>
          <td className='pokemon-stats'>{attack.damage}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td className='pokemon-stats'>-</td>
        <td className='pokemon-stats'>-</td>
        <td className='pokemon-stats'>-</td>
      </tr>
    )

  return <CardView name={name} avatar={avatar} rows={rows} />
}

function CardView({
  name,
  avatar,
  rows,
  isError = false,
}: {
  name: string
  avatar: React.ReactNode
  rows: React.ReactNode
  isError?: boolean
}) {
  // let normalClassName = 'pokemon-wrapper'
  // let errorClassName = 'pokemon-wrapper-error'
  // let className = isError ? errorClassName : normalClassName

  return (
    <div className={`pokemon-wrapper${isError ? '-error' : ''}`}>
      <h1 className={`pokemon-name${isError ? '-error' : ''}`}>{name}</h1>
      <div className={`pokemon-avatar${isError ? '-error' : ''}`}>{avatar}</div>
      <div className='pokemon-stats'>
        <table>
          <thead>
            <tr>
              <th className={`pokemon-stats-title${isError ? '-error' : ''}`}>Ability</th>
              <th className={`pokemon-stats-title${isError ? '-error' : ''}`}>Type</th>
              <th className={`pokemon-stats-title${isError ? '-error' : ''}`}>Damage</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

function PokemonErrorView({ error, onReset }: { error: Error; onReset: () => void }) {
  return (
    <CardView
      name='Error! :( (xxx)'
      avatar={
        <>
          {error.message}
          <button className='btn-error' onClick={onReset}>
            Try again
          </button>{' '}
        </>
      }
      rows={
        <tr>
          <td className='pokemon-stats-error'>-</td>{' '}
          <td className='pokemon-stats-error'>-</td>
          <td className='pokemon-stats-error'>-</td>
        </tr>
      }
      isError
    />
  )
}

async function fetchPokemon(pokemonName: string) {
  const pokemonQuery = `
                  query PokemonInfo($name: String) {
                    pokemon(name: $name) {
                      id
                      number
                      name
                      image
                      attacks {
                        special {
                          name
                          type
                          damage
                        }
                      }
                    }
                  }
                `

  const response = await fetch('https://graphql-pokemon2.vercel.app/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: { name: pokemonName.toLowerCase() },
    }),
  })

  const { data } = await response.json()
  const pokemon = data?.pokemon

  if (pokemon) {
    return pokemon
  } else {
    throw new Error(`No pokemon with the name "${pokemonName}"`)
  }
}

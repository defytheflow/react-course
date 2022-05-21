import React from 'react'
import withTitle from '../../utils/with-title'

function Search() {
  const [data, setData] = React.useState({ hits: [] })
  const [query, setQuery] = React.useState('react')

  React.useEffect(() => {
    let ignore = false

    async function fetchData() {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
      const json = await response.json()
      if (!ignore) setData(json)
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [query])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map((item: any) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withTitle(Search, 'Search')

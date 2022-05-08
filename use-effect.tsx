/**
 * 1. Update the document's title every time a piece of state changes.
 */
function DocumentTitle() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Click me</button>
    </div>
  )
}

/**
 * 2. Focus an input on the first render.
 */
function FocusInput() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}

/**
 * 3. Fetch data on the first render and display it.
 */
function FetchData() {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    let mounted = true

    async function fetchData() {
      const response = await fetch('https://www.reddit.com/r/reactjs.json')
      const json = await response.json()
      if (mounted) {
        setPosts(json.data.children.map(child => child.data))
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

/**
 * 4. Display the current window's width.
 */
function WindowWidth() {
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    function handleResize(e: UIEvent) {
      const { width } = document.body.getBoundingClientRect()
      setWidth(Math.ceil(width))
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <h1>The window width is {width} pixels</h1>
}

/**
 * 5. Display a counter, that increases by one every second.
 */
function Counter() {
  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <h1>Counter: {counter}</h1>
}

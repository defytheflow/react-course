// https://beta.reactjs.org/learn/responding-to-events
import React from 'react'

export default function Color() {
  const [clicks, setClicks] = React.useState(0)

  function handleChangeColor(e: React.MouseEvent) {
    e.stopPropagation()
    document.body.style.backgroundColor = getRandomLightColor()
  }

  React.useEffect(() => {
    function handleClickOutside() {
      setClicks(c => c + 1)
    }
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <button onClick={handleChangeColor}>Change color</button>
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  )
}

function getRandomLightColor() {
  const r = 150 + Math.round(100 * Math.random())
  const g = 150 + Math.round(100 * Math.random())
  const b = 150 + Math.round(100 * Math.random())
  return `rgb(${r}, ${g}, ${b})`
}

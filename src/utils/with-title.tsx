import React from 'react'

export default function withTitle(Component: React.ComponentType, heading: string) {
  function WithTitle() {
    React.useEffect(() => {
      document.title = `React / ${heading}`
    }, [])
    return <Component />
  }

  WithTitle.displayName = `WithTitle(${getDisplayName(Component)})`
  return WithTitle
}

function getDisplayName(Component: React.ComponentType) {
  return Component.displayName || Component.name || 'Component'
}

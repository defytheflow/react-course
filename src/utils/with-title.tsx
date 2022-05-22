import React from 'react'

export default function withTitle<P>(Component: React.ComponentType<P>, heading: string) {
  function WithTitle(props: P) {
    React.useEffect(() => {
      document.title = `React / ${heading}`
    }, [])
    return <Component {...props} />
  }

  WithTitle.displayName = `WithTitle(${getDisplayName(Component)})`
  return WithTitle
}

function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Component'
}

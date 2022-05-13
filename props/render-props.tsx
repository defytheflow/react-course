/**
 * 1. Render a component using render prop.
 */
function RendererExample() {
  return (
    <Renderer>
      {() => {
        return <h1>I am being rendered by Renderer</h1>
      }}
    </Renderer>
  )
}

function Renderer(props: { children: () => React.ReactNode }) {
  return props.children()
}

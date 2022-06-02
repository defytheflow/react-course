// https://beta.reactjs.org/learn/conditional-rendering
export default function PackingList() {
  return (
    <div>
      <h2>My Packing List</h2>
      <ul>
        <Item name='Space suit' isPacked={true} importance={9} />
        <Item name='Helmet with a golden leaf' isPacked={true} importance={0} />
        <Item name='Photo of Tam' isPacked={false} importance={6} />
      </ul>
    </div>
  )
}

function Item({
  name,
  isPacked,
  importance,
}: {
  name: string
  isPacked: boolean
  importance: number
}) {
  return (
    <li>
      {isPacked ? <del>{name + ' ✓'}</del> : name}
      {importance > 0 && <i>( Importance: {importance})</i>}
    </li>
  )
}

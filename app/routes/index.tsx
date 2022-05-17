import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>React Course</h1>
      <ul>
        <li>
          <Link to='examples'>Examples</Link>
        </li>
        <li>
          <Link to='exercises'>Exercises</Link>
        </li>
      </ul>
    </div>
  )
}

import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Counter from './exercises/01-beginner/05-counter'
import Greeting from './exercises/01-beginner/01-greeting'
import Light from './exercises/01-beginner/03-light'
import Toggle from './exercises/01-beginner/02-toggle'
import Timer from './exercises/02-intermediate/timer'
import Todo from './exercises/02-intermediate/todo/todo'
import Pokemon from './exercises/02-intermediate/pokemon'
import Math from './exercises/01-beginner/04-math'
import BuggyCounter from './exercises/01-beginner/06-buggy-counter'

export default function App() {
  return (
    <div className='grid place-items-center'>
      <nav className='flex gap-4 mb-10'>
        <Link to='/greeting'>Greeting</Link>
        <Link to='/toggle'>Toggle</Link>
        <Link to='/light'>Light</Link>
        <Link to='/math'>Math</Link>
        <Link to='/counter'>Counter</Link>
        <Link to='/buggy-counter'>Buggy Counter</Link>
        <Link to='/timer'>Timer</Link>
        <Link to='/todo'>Todo</Link>
        <Link to='/pokemon'>Pokemon</Link>
      </nav>
      <Routes>
        <Route path='/counter' element={<Counter />} />
        <Route path='/greeting' element={<Greeting />} />
        <Route path='/light' element={<Light />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/math' element={<Math />} />
        <Route path='/toggle' element={<Toggle />} />
        <Route path='/buggy-counter' element={<BuggyCounter />} />
      </Routes>
    </div>
  )
}

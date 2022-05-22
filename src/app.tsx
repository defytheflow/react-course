import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Counter from './exercises/01-beginner/05-counter'
import Greeting from './exercises/01-beginner/01-greeting'
import Light from './exercises/01-beginner/03-light'
import Toggle from './exercises/01-beginner/02-toggle'
import Timer from './exercises/02-intermediate/timer'
import Todo from './exercises/02-intermediate/todo'
import Pokemon from './exercises/02-intermediate/pokemon'
import Mathematics from './exercises/01-beginner/04-math'
import BuggyCounter from './exercises/01-beginner/06-buggy-counter'
import Search from './exercises/01-beginner/08-search'
import Fruits from './exercises/01-beginner/10-fruits'

export default function App() {
  return (
    <div className='grid place-items-center'>
      <nav className='mt-4 mb-8'>
        <div className='flex gap-4'>
          <NavLink to='/exercises/beginner/greeting'>Greeting</NavLink>
          <NavLink to='/exercises/beginner/toggle'>Toggle</NavLink>
          <NavLink to='/exercises/beginner/light'>Light</NavLink>
          <NavLink to='/exercises/beginner/math'>Math</NavLink>
          <NavLink to='/exercises/beginner/counter'>Counter</NavLink>
          <NavLink to='/exercises/beginner/buggy-counter'>Buggy Counter</NavLink>
          <NavLink to='/exercises/beginner/search'>Search</NavLink>
          <NavLink to='/exercises/beginner/fruits'>Fruits</NavLink>
        </div>
        <br />
        <div className='flex gap-4'>
          <NavLink to='/exercises/intermediate/timer'>Timer</NavLink>
          <NavLink to='/exercises/intermediate/todo'>Todo</NavLink>
          <NavLink to='/exercises/intermediate/pokemon'>Pokemon</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path='exercises'>
          <Route path='beginner'>
            <Route path='buggy-counter' element={<BuggyCounter />} />
            <Route path='counter' element={<Counter />} />
            <Route path='fruits' element={<Fruits />} />
            <Route path='greeting' element={<Greeting />} />
            <Route path='light' element={<Light />} />
            <Route path='math' element={<Mathematics />} />
            <Route path='search' element={<Search />} />
            <Route path='toggle' element={<Toggle />} />
          </Route>
          <Route path='intermediate'>
            <Route path='pokemon' element={<Pokemon />} />
            <Route path='timer' element={<Timer />} />
            <Route path='todo' element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

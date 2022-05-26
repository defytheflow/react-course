import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import NumberDescriber from './exercises/01-beginner/00-number'
import Greeting from './exercises/01-beginner/01-greeting'
import Toggle from './exercises/01-beginner/02-toggle'
import Color from './exercises/01-beginner/03-color'
import Mathematics from './exercises/01-beginner/04-math'
import Counter from './exercises/01-beginner/05-counter'
import BuggyCounter from './exercises/01-beginner/06-buggy-counter'
import Search from './exercises/01-beginner/08-search'
import Fruits from './exercises/01-beginner/10-fruits'
import Messenger from './exercises/01-beginner/11-messenger'
import Clock from './exercises/01-beginner/13-clock'
import Pokemon from './exercises/02-intermediate/pokemon'
import Timer from './exercises/02-intermediate/timer'
import Todo from './exercises/02-intermediate/todo'

export default function App() {
  return (
    <>
      <nav className='mt-4 mb-8'>
        <div className='flex justify-center gap-4'>
          <NavLink to='/exercises/beginner/counter'>Counter</NavLink>
          <NavLink to='/exercises/intermediate/timer'>Timer</NavLink>
          <NavLink to='/exercises/intermediate/todo'>Todo</NavLink>
        </div>
        <br />

        <div className='flex justify-center gap-4'>
          <NavLink to='/exercises/beginner/number'>Number</NavLink>
          <NavLink to='/exercises/beginner/greeting'>Greeting</NavLink>
          <NavLink to='/exercises/beginner/toggle'>Toggle</NavLink>
          <NavLink to='/exercises/beginner/clock'>Clock</NavLink>
          <NavLink to='/exercises/beginner/color'>Color</NavLink>
          <NavLink to='/exercises/beginner/math'>Math</NavLink>
          <NavLink to='/exercises/beginner/buggy-counter'>Buggy Counter</NavLink>
          <NavLink to='/exercises/beginner/search'>Search</NavLink>
          <NavLink to='/exercises/beginner/fruits'>Fruits</NavLink>
          <NavLink to='/exercises/beginner/messenger'>Messenger</NavLink>
        </div>
        <br />

        <div className='flex justify-center gap-4'>
          <NavLink to='/exercises/intermediate/pokemon'>Pokemon</NavLink>
        </div>
      </nav>

      <main className='grid place-items-center'>
        <Routes>
          <Route path='exercises'>
            <Route path='beginner'>
              <Route path='buggy-counter' element={<BuggyCounter />} />
              <Route path='clock' element={<Clock />} />
              <Route path='color' element={<Color />} />
              <Route path='counter' element={<Counter />} />
              <Route path='fruits' element={<Fruits />} />
              <Route path='greeting' element={<Greeting />} />
              <Route path='math' element={<Mathematics />} />
              <Route path='messenger' element={<Messenger />} />
              <Route path='number' element={<NumberDescriber />} />
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
      </main>
    </>
  )
}

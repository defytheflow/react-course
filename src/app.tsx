import React from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'

import HideElement from './exercises/conditional-rendering/hide-element'
import NumberDescriber from './exercises/conditional-rendering/number-describer'
import PackingList from './exercises/conditional-rendering/packing-list'
import Greeting from './exercises/conditional-rendering/greeting'

import Counter from './exercises/01-beginner/05-counter'
import Timer from './exercises/02-intermediate/timer'
import Todo from './exercises/02-intermediate/todo'

import Toggle from './exercises/01-beginner/02-toggle'
import Color from './exercises/01-beginner/03-color'
import Mathematics from './exercises/01-beginner/04-math'
import BuggyCounter from './exercises/01-beginner/06-buggy-counter'
import Search from './exercises/01-beginner/08-search'
import Fruits from './exercises/01-beginner/10-fruits'
import Messenger from './exercises/01-beginner/11-messenger'
import Clock from './exercises/01-beginner/13-clock'
import Pokemon from './exercises/02-intermediate/pokemon'
import GreetingForm from './exercises/01-beginner/01-greeting'

const conditionalRenderingLinks = [
  { to: '/exercises/conditional-rendering/number-describer', title: 'Number Describer' },
  { to: '/exercises/conditional-rendering/packing-list', title: 'Packing List' },
  { to: '/exercises/conditional-rendering/greeting', title: 'Greeting' },
  { to: '/exercises/conditional-rendering/hide-element', title: 'Hide Element' },
]

const completeExercisesLinks = [
  { to: '/exercises/beginner/counter', title: 'Counter' },
  { to: '/exercises/intermediate/timer', title: 'Timer' },
  { to: '/exercises/intermediate/todo', title: 'Todo' },
]

const otherExercisesLinks = [
  { to: '/exercises/beginner/greeting', title: 'Greeting' },
  { to: '/exercises/beginner/toggle', title: 'Toggle' },
  { to: '/exercises/beginner/clock', title: 'Clock' },
  { to: '/exercises/beginner/color', title: 'Color' },
  { to: '/exercises/beginner/math', title: 'Math' },
  { to: '/exercises/beginner/buggy-counter', title: 'Buggy Counter' },
  { to: '/exercises/beginner/search', title: 'Search' },
  { to: '/exercises/beginner/fruits', title: 'Fruits' },
  { to: '/exercises/beginner/messenger', title: 'Messenger' },
  { to: '/exercises/intermediate/pokemon', title: 'Pokemon' },
]

const allLinks = [
  ...conditionalRenderingLinks,
  ...completeExercisesLinks,
  ...otherExercisesLinks,
]

export default function App() {
  const { pathname } = useLocation()
  const link = allLinks.find(link => link.to === pathname)

  return (
    <>
      <nav className='my-4 h-10'>
        {link && <h1 className='text-center'>{link.title}</h1>}
      </nav>
      <div className='flex'>
        <aside>
          <nav>
            <ul className='flex flex-col gap-3 list-none m-0'>
              <li>
                <span className='font-semibold'>Conditional Rendering</span>
                <ul>
                  {conditionalRenderingLinks.map(link => (
                    <li key={link.to}>
                      <NavLink to={link.to}>{link.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <span className='font-semibold'>Complete Exercises</span>
                <ul>
                  {completeExercisesLinks.map(link => (
                    <li key={link.to}>
                      <NavLink to={link.to}>{link.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <span className='font-semibold'>Other Exercises</span>
                <ul>
                  {otherExercisesLinks.map(link => (
                    <li key={link.to}>
                      <NavLink to={link.to}>{link.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        <main className='flex justify-center flex-grow'>
          <Routes>
            <Route path='exercises'>
              <Route path='conditional-rendering'>
                <Route path='greeting' element={<Greeting />} />
                <Route path='hide-element' element={<HideElement />} />
                <Route path='number-describer' element={<NumberDescriber />} />
                <Route path='packing-list' element={<PackingList />} />
              </Route>

              <Route path='beginner'>
                <Route path='buggy-counter' element={<BuggyCounter />} />
                <Route path='clock' element={<Clock />} />
                <Route path='color' element={<Color />} />
                <Route path='counter' element={<Counter />} />
                <Route path='fruits' element={<Fruits />} />
                <Route path='math' element={<Mathematics />} />
                <Route path='messenger' element={<Messenger />} />
                <Route path='search' element={<Search />} />
                <Route path='toggle' element={<Toggle />} />
                <Route path='greeting' element={<GreetingForm />} />
              </Route>

              <Route path='intermediate'>
                <Route path='pokemon' element={<Pokemon />} />
                <Route path='timer' element={<Timer />} />
                <Route path='todo' element={<Todo />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </>
  )
}

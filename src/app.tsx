import React from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'

import HideElement from './exercises/conditional-rendering/hide-element'
import NumberDescriber from './exercises/conditional-rendering/number-describer'
import PackingList from './exercises/conditional-rendering/packing-list'
import Greeting from './exercises/conditional-rendering/greeting'

import Divs from './exercises/forms/divs'
import Mathematics from './exercises/forms/math'

import Counter from './exercises/01-beginner/05-counter'
import Timer from './exercises/02-intermediate/timer'
import Todo from './exercises/02-intermediate/todo'

import Toggle from './exercises/01-beginner/02-toggle'
import Color from './exercises/01-beginner/03-color'
import BuggyCounter from './exercises/01-beginner/06-buggy-counter'
import Search from './exercises/01-beginner/08-search'
import Fruits from './exercises/01-beginner/10-fruits'
import Messenger from './exercises/01-beginner/11-messenger'
import Clock from './exercises/01-beginner/13-clock'
import Pokemon from './exercises/02-intermediate/pokemon'
import GreetingForm from './exercises/01-beginner/01-greeting'
import Counters from './exercises/01-beginner/14-counters'
import ProductTable from './exercises/01-beginner/15-product-table'
import ApplesForm from './exercises/forms/01-apples-form'

const conditionalRenderingLinks = [
  { to: '/exercises/conditional-rendering/number-describer', title: 'Number Describer' },
  { to: '/exercises/conditional-rendering/packing-list', title: 'Packing List' },
  { to: '/exercises/conditional-rendering/greeting', title: 'Greeting' },
  { to: '/exercises/conditional-rendering/hide-element', title: 'Hide Element' },
]

const formLinks = [
  { to: '/exercises/forms/divs', title: 'Divs' },
  { to: '/exercises/forms/math', title: 'Math' },
  { to: '/exercises/forms/apples-form', title: 'Apples Form' },
]

const completeExercisesLinks = [
  { to: '/exercises/beginner/counter', title: 'Counter' },
  { to: '/exercises/intermediate/timer', title: 'Timer' },
  { to: '/exercises/intermediate/todo', title: 'Todo' },
]

const otherExercisesLinks = [
  { to: '/exercises/beginner/greeting', title: 'Greeting' },
  { to: '/exercises/beginner/toggle', title: 'Toggle' },
  { to: '/exercises/beginner/counters', title: 'Counters' },
  { to: '/exercises/beginner/clock', title: 'Clock' },
  { to: '/exercises/beginner/color', title: 'Color' },
  { to: '/exercises/beginner/buggy-counter', title: 'Buggy Counter' },
  { to: '/exercises/beginner/search', title: 'Search' },
  { to: '/exercises/beginner/fruits', title: 'Fruits' },
  { to: '/exercises/beginner/messenger', title: 'Messenger' },
  { to: '/exercises/beginner/product-table', title: 'Product Table' },
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
              <NavList title='Conditional Rendering' links={conditionalRenderingLinks} />
              <NavList title='Forms' links={formLinks} />
              <NavList title='Complete Exercises' links={completeExercisesLinks} />
              <NavList title='Other Exercises' links={otherExercisesLinks} />
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

              <Route path='forms'>
                <Route path='divs' element={<Divs />} />
                <Route path='math' element={<Mathematics />} />
                <Route path='apples-form' element={<ApplesForm />} />
              </Route>

              <Route path='beginner'>
                <Route path='buggy-counter' element={<BuggyCounter />} />
                <Route path='clock' element={<Clock />} />
                <Route path='color' element={<Color />} />
                <Route path='counter' element={<Counter />} />
                <Route path='fruits' element={<Fruits />} />
                <Route path='messenger' element={<Messenger />} />
                <Route path='search' element={<Search />} />
                <Route path='toggle' element={<Toggle />} />
                <Route path='greeting' element={<GreetingForm />} />
                <Route path='counters' element={<Counters />} />
                <Route path='product-table' element={<ProductTable />} />
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

function NavList({ title, links }: { title: string; links: typeof allLinks }) {
  return (
    <li>
      <span className='font-semibold'>{title}</span>
      <ul className='list-none'>
        {links.map(link => (
          <li key={link.to}>
            <NavLink to={link.to}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

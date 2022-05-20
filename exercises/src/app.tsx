import { Link, Route, Routes } from 'react-router-dom'
import Counter from './counter/counter'
import Keypad from './keypad/keypad'
import Light from './light/light'
import Pokemon from './pokemon/pokemon'
import Timer from './timer/timer'
import Todo from './todo/todo'

export default function App() {
  return (
    <div className='grid place-items-center'>
      <nav className='flex gap-4 mb-10'>
        <Link to='/counter'>Counter</Link>
        <Link to='/timer'>Timer</Link>
        <Link to='/todo'>Todo</Link>
        <Link to='/pokemon'>Pokemon</Link>
        <Link to='/light'>Light</Link>
        <Link to='/keypad'>Keypad</Link>
      </nav>
      <Routes>
        <Route path='/todo' element={<Todo />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/keypad' element={<Keypad />} />
        <Route path='/light' element={<Light />} />
      </Routes>
    </div>
  )
}

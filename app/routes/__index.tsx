import { NavLink, Outlet, useLocation } from '@remix-run/react'

type LinkType = Readonly<{ to: string; title: string }>
type LinksMap = Record<string, LinkType[]>

const links: LinksMap = {
  conditionalRendering: [
    {
      to: '/exercises/conditional-rendering/number-describer',
      title: 'Number Describer',
    },
    { to: '/exercises/conditional-rendering/packing-list', title: 'Packing List' },
    { to: '/exercises/conditional-rendering/greeting', title: 'Greeting' },
    { to: '/exercises/conditional-rendering/hide-element', title: 'Hide Element' },
  ],
  forms: [
    { to: '/exercises/forms/divs', title: 'Divs' },
    { to: '/exercises/forms/math', title: 'Math' },
    { to: '/exercises/forms/apples-form', title: 'Apples Form' },
  ],
  lists: [{ to: '/exercises/lists/fruits', title: 'Fruits' }],
  completeExercises: [
    { to: '/exercises/beginner/counter', title: 'Counter' },
    { to: '/exercises/intermediate/timer', title: 'Timer' },
    { to: '/exercises/intermediate/todo', title: 'Todo' },
  ],
  otherExercises: [
    { to: '/exercises/beginner/greeting', title: 'Greeting' },
    { to: '/exercises/beginner/toggle', title: 'Toggle' },
    { to: '/exercises/beginner/counters', title: 'Counters' },
    { to: '/exercises/beginner/clock', title: 'Clock' },
    { to: '/exercises/beginner/color', title: 'Color' },
    { to: '/exercises/beginner/buggy-counter', title: 'Buggy Counter' },
    { to: '/exercises/beginner/search', title: 'Search' },
    { to: '/exercises/beginner/messenger', title: 'Messenger' },
    { to: '/exercises/beginner/product-table', title: 'Product Table' },
    { to: '/exercises/intermediate/pokemon', title: 'Pokemon' },
  ],
}

const allLinks = Object.values(links).flat()

export default function Index() {
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
              <NavList title='Conditional Rendering' links={links.conditionalRendering} />
              <NavList title='Forms' links={links.forms} />
              <NavList title='Lists' links={links.lists} />
              <NavList title='Complete Exercises' links={links.completeExercises} />
              <NavList title='Other Exercises' links={links.otherExercises} />
            </ul>
          </nav>
        </aside>

        <main className='flex justify-center flex-grow'>
          <Outlet />
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

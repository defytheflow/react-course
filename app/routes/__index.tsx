import type { LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import fs from 'fs'
import { links } from '~/root'

type LinkType = Readonly<{ to: string; title: string }>
type LoaderData = Record<string, LinkType[]>

function getFilesRecursive(dir: string, _files: string[] = []) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const name = dir + '/' + file
    if (fs.statSync(name).isDirectory()) {
      getFilesRecursive(name, _files)
    } else {
      _files.push(name)
    }
  }

  return _files
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)
const makeTitle = (s: string) => s.split('-').map(capitalize).join(' ')

export const loader: LoaderFunction = () => {
  const pathnames = getFilesRecursive('./app/routes/__index/exercises')
    .map(s => s.replace(/^.*__index/, ''))
    .map(s => s.replace(/.tsx/, ''))

  const map: LoaderData = {}

  for (const pathname of pathnames) {
    const parts = pathname.split('/')
    const category = makeTitle(parts[2])
    const name = makeTitle(parts[3])
    map[category] = map[category] ?? []
    map[category].push({ to: pathname, title: name })
  }

  return map
}

export default function Index() {
  const linksData = useLoaderData<LoaderData>()
  const allLinks = Object.values(linksData).flat()

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
            <ul>
              <li>
                <span className='font-semibold'>Exercises</span>
                <ul className='flex flex-col gap-3 list-none m-0'>
                  {Object.entries(linksData).map(([title, links]) => (
                    <NavList key={title} title={title} links={links} />
                  ))}
                </ul>
              </li>
              <li>
                <span className='font-semibold'>Interviews</span>
                <ul className='list-none'>
                  <li>
                    <NavLink to='/interviews/react'>React</NavLink>
                  </li>
                  <li>
                    <NavLink to='/interviews/redux'>Redux</NavLink>
                  </li>
                </ul>
              </li>
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

function NavList({ title, links }: { title: string; links: LinkType[] }) {
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

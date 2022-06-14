import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import fs from 'fs'
import { capitalize } from '~/utils/misc'
import useToggle from '~/utils/use-toggle'

export const meta: MetaFunction = ({ location }) => {
  const { length, [length - 1]: lastPathnameSegment } = location.pathname.split('/')
  const name = makeTitle(lastPathnameSegment ?? '')
  return { title: `React Course - ${name}` }
}

type LinkType = Readonly<{ to: string; title: string }>
type LoaderData = {
  initialAsideOpen: 'true' | 'false'
  linksData: Record<string, LinkType[]>
}

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

const makeTitle = (s: string) => s.split('-').map(capitalize).join(' ')

const ASIDE_COOKIE = 'aside_open'

// https://stackoverflow.com/a/3409200
function parseCookies(request: Request) {
  const cookies: Record<string, string> = {}
  const cookieHeader = request.headers.get('cookie')

  if (cookieHeader === null) {
    return cookies
  }

  for (const cookie of cookieHeader.split(';')) {
    let [name, ...rest] = cookie.split(`=`)
    name = name?.trim()
    if (!name) continue
    const value = rest.join(`=`).trim()
    if (!value) continue
    cookies[name] = decodeURIComponent(value)
  }

  return cookies
}

export const loader: LoaderFunction = ({ request }) => {
  const cookies = parseCookies(request)

  const pathnames = getFilesRecursive('./app/routes/__index/exercises')
    .map(s => s.replace(/^.*__index/, ''))
    .map(s => s.replace(/.tsx/, ''))

  const map: LoaderData['linksData'] = {}

  for (const pathname of pathnames) {
    const parts = pathname.split('/')
    const category = makeTitle(parts[2])
    const name = makeTitle(parts[3])
    map[category] = map[category] ?? []
    map[category].push({ to: pathname, title: name })
  }

  const data: LoaderData = {
    initialAsideOpen: cookies[ASIDE_COOKIE] as LoaderData['initialAsideOpen'],
    linksData: map,
  }

  return data
}

export default function Index() {
  const { initialAsideOpen, linksData } = useLoaderData<LoaderData>()
  const allLinks = Object.values(linksData).flat()

  const { pathname } = useLocation()
  const link = allLinks.find(link => link.to === pathname)
  const [isAsideOpen, toggleAside] = useToggle(initialAsideOpen !== 'false')

  React.useEffect(() => {
    document.cookie = `${ASIDE_COOKIE}=${isAsideOpen}; SameSite=Lax;`
  }, [isAsideOpen])

  return (
    <>
      <nav className='my-4 h-10'>
        {link && <h1 className='text-center'>{link.title}</h1>}
      </nav>

      <button aria-haspopup onClick={toggleAside}>
        {isAsideOpen ? 'Hide' : 'Show'} menu
      </button>
      <div className='flex'>
        {isAsideOpen && (
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
        )}

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

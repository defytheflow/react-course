import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { getRoutesLinks } from '~/utils.server'

type LoaderData = string[]

export const loader: LoaderFunction = () => {
  return getRoutesLinks('./app/routes/examples')
}

export default function Index() {
  const exampleLinks = useLoaderData<LoaderData>()
  return (
    <ul>
      {exampleLinks.map(link => (
        <li key={link}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  )
}

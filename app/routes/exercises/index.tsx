import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { getRoutesLinks } from '~/utils.server'

type LoaderData = string[]

export const loader: LoaderFunction = () => {
  return getRoutesLinks('./app/routes/exercises')
}

export default function Index() {
  const exerciseLinks = useLoaderData<LoaderData>()
  return (
    <ul>
      {exerciseLinks.map(link => (
        <li key={link}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  )
}

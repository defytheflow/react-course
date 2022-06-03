import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import fs from 'fs'
import { marked } from 'marked'

export const loader: LoaderFunction = () => {
  const markdown = fs.readFileSync('./docs/redux-interview-questions.md').toString()
  const html = marked(markdown)
  return html
}

export default function ReduxInterview() {
  const html = useLoaderData()
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

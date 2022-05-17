import fs from 'fs'

export function getRoutesLinks(path: string): string[] {
  return fs
    .readdirSync(path)
    .filter(filename => filename !== 'index.tsx')
    .map(filename => filename.replace('.tsx', ''))
}

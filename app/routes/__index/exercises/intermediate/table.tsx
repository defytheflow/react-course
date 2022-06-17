import React from 'react'
import movieData from '~/data/movie-data'

type Primitive = string | number | boolean
type ColumnType<T> = {
  name: string
  selector: (row: T) => Primitive
  sortable?: boolean
}

type MovieType = typeof movieData[number]

const columns: ColumnType<MovieType>[] = [
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Director',
    selector: row => row.director,
    sortable: true,
  },
  {
    name: 'Year',
    selector: row => row.year,
    sortable: true,
  },
]

export default function TableApp() {
  return (
    <div>
      <h2>Movie List</h2>
      <Table columns={columns} data={movieData} />
    </div>
  )
}

function Table<T>({ columns, data }: { columns: ColumnType<T>[]; data: T[] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.name}
              align='left'
              style={{ borderBottom: '1px solid black' }}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.name} style={{ borderBottom: '1px solid black' }}>
                {column.selector(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

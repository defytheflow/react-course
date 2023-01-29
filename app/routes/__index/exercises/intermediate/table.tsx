import type { LinksFunction } from "@remix-run/node";
import React from "react";

import movieData from "~/data/movie-data";
import styles from "~/styles/table.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type Primitive = string | number | boolean;
type ColumnType<T> = {
  name: string;
  selector: (row: T) => Primitive;
  sortable?: boolean;
};

type MovieType = (typeof movieData)[number];

const columns: ColumnType<MovieType>[] = [
  {
    name: "Title",
    selector: row => row.title,
    sortable: true,
  },
  {
    name: "Director",
    selector: row => row.director,
    sortable: true,
  },
  {
    name: "Year",
    selector: row => row.year,
    sortable: true,
  },
];

export default function TableApp() {
  return (
    <div>
      <h2>Movies</h2>
      <Table columns={columns} data={movieData} />
    </div>
  );
}

function Table<T>({ columns, data }: { columns: ColumnType<T>[]; data: T[] }) {
  const [sortedColumn, setSortedColumn] = React.useState<string | null>(null);

  // const sortableColumnNames = columns.filter(col => col.sortable).map(col => col.name)
  // console.log(sortableColumnNames)

  function handleSortClick(column: ColumnType<T>) {
    const direction = "up";
    setSortedColumn({ name: column.name, direction });
    // console.log('SORT CLICK', column)
  }

  // sort -> each column up | column down
  return (
    <table>
      {/* <caption>Movies</caption> */}
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.name} align="left">
              {column.sortable ? (
                <button onClick={() => handleSortClick(column)}>
                  {column.name}
                  <span aria-hidden className="sort-indicator">
                    ▲ ▼
                  </span>
                </button>
              ) : (
                column.name
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.name}>{column.selector(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

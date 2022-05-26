import React from 'react'

type Product = {
  category: 'Fruits' | 'Vegetables'
  price: string
  stocked: boolean
  name: string
}

type ProductCategory = Product['category']

const products: Product[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragon Fruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passion Fruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
]

export default function ProductTable() {
  const [filterText, setFilterText] = React.useState('')
  const [inStockOnly, setInStockOnly] = React.useState(false)

  const filteredProducts = products.filter(product => {
    const nameMatches = product.name.toLowerCase().includes(filterText.toLowerCase())
    const stockedMatches = inStockOnly ? product.stocked : true
    return nameMatches && stockedMatches
  })

  return (
    <div>
      <Search
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <Table products={filteredProducts} />
    </div>
  )
}

function Search({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: React.Dispatch<React.SetStateAction<typeof filterText>>
  onInStockOnlyChange: React.Dispatch<React.SetStateAction<typeof inStockOnly>>
}) {
  return (
    <form>
      <input
        type='text'
        placeholder='Search...'
        aria-label='Search...'
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
      <label style={{ display: 'block' }}>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={e => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  )
}

function Table({ products }: { products: Product[] }) {
  const rows: JSX.Element[] = []
  let lastCategory: ProductCategory | null = null

  products.forEach(product => {
    if (product.category !== lastCategory) {
      rows.push(<CategoryRow key={product.category} category={product.category} />)
    }
    rows.push(<ProductRow key={product.name} product={product} />)
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CategoryRow({ category }: { category: ProductCategory }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  )
}

function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  )

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

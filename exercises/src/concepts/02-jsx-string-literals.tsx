function StringLiteralsEx() {
  return (
    <>
      {/* These JSX expressions are equivalent. */}
      <input defaultValue='hello world' />
      <input defaultValue={'hello world'} />

      {/* These JSX expressions are equivalent. */}
      <input defaultValue='&lt;3' />
      <input defaultValue='<3' />
      <input defaultValue={'<3'} />

      {/* While this isn't. */}
      <input defaultValue={'&lt;3'} />
    </>
  )
}

export { StringLiteralsEx }

// react@17 - Usage without useLayoutEffect causes flickering.
// react@18 - Usage without useLayoutEffect does not cause flickering.
function Popup() {
  const [show, setShow] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useLayoutEffect(() => {
    if (popupRef.current && buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect()
      popupRef.current.style.top = `${bottom + 100}px`
    }
  }, [show])

  return (
    <>
      <button ref={buttonRef} onClick={() => setShow(prev => !prev)}>
        Click Here
      </button>
      {show && (
        <div ref={popupRef} style={{ position: 'relative' }}>
          This is a popup
        </div>
      )}
    </>
  )
}

// react@17 - Usage without useLayoutEffect causes flickering.
// react@18 - Usage without useLayoutEffect causes flickering.
function BlinkyRender() {
  const [value, setValue] = React.useState(0)

  React.useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200)
    }
  }, [value])

  return (
    <div>
      Value: {value}
      <button onClick={() => setValue(0)}>Click</button>
    </div>
  )
}

// react@17 - Usage without useLayoutEffect causes flickering.
// react@18 - Usage without useLayoutEffect does not cause flickering.
function JumpingNumber() {
  const [number, setNumber] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (sectionRef.current) {
      const random = Math.floor(Math.random() * 250)
      for (let i = 0; i <= 1_000_000_000; i++);
      sectionRef.current.style.paddingTop = `${random}px`
    }
  }, [number])

  return (
    <div ref={sectionRef}>
      <p>{number}</p>
      <button onClick={() => setNumber(prev => prev - 1)}>-</button>
      <button onClick={() => setNumber(prev => prev + 1)}>+</button>
    </div>
  )
}

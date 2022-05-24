import React from 'react'

export default function Button({
  disabled,
  onClick,
  ...rest
}: {
  disabled?: boolean
  onClick?: React.MouseEventHandler
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
  children?: React.ReactNode
}) {
  function handleClick(e: React.MouseEvent) {
    if (disabled) {
      e.preventDefault()
    } else {
      onClick?.(e)
    }
  }

  return (
    <button
      aria-disabled={disabled}
      onClick={handleClick}
      style={{
        pointerEvents: disabled ? 'none' : 'all',
        opacity: disabled ? 0.5 : undefined,
      }}
      {...rest}
    />
  )
}

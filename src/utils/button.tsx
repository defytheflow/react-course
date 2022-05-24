import React from 'react'

export default function Button({
  disabled,
  ...rest
}: {
  disabled?: boolean
  onClick?: React.MouseEventHandler
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      aria-disabled={disabled}
      onClick={disabled ? e => e.preventDefault() : rest.onClick}
      style={{
        pointerEvents: disabled ? 'none' : 'all',
        opacity: disabled ? 0.5 : undefined,
      }}
      {...rest}
    />
  )
}

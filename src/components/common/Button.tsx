import React from 'react'
import './Button.css'

interface ButtonProps {
  variant: string
  onClick: () => void
  label: string
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, label }) => {
  return (
    <button className={variant} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button

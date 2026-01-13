import { type ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  onClick: () => void
  variant?: 'default' | 'primary' | 'danger'
  size?: 'sm' | 'md'
  disabled?: boolean
  title?: string
}

export function IconButton({
  icon,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  title,
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-1.5',
  }

  const variantClasses = {
    default:
      'text-fluid-text-muted hover:text-fluid-text-primary hover:bg-[rgba(255,255,255,0.05)]',
    primary:
      'text-fluid-cyan hover:bg-[rgba(45,212,191,0.1)]',
    danger:
      'text-red-400 hover:bg-red-500/10',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        rounded transition-colors
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
    >
      {icon}
    </button>
  )
}

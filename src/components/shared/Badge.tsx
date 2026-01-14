interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
}

export function Badge({ children, variant = 'secondary' }: BadgeProps) {
  const variantClasses = {
    primary:
      'bg-[rgba(45,212,191,0.15)] text-fluid-cyan',
    secondary:
      'bg-[rgba(255,255,255,0.08)] text-fluid-text-muted',
    success:
      'bg-green-500/15 text-green-400',
    warning:
      'bg-amber-500/15 text-amber-400',
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}

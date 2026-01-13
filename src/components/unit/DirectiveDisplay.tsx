interface DirectiveDisplayProps {
  directive: string
}

export function DirectiveDisplay({ directive }: DirectiveDisplayProps) {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <p className="text-fluid-text-primary text-xs leading-normal whitespace-pre-wrap">
        {directive}
      </p>
    </div>
  )
}

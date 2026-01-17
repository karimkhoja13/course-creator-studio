interface ResizeHandleProps {
  onResizeStart: () => void
  onResize: (newWidth: number) => void
  onResizeEnd: () => void
  side: 'left' | 'right'
  currentWidth: number
  minWidth: number
  maxWidth: number
}

export function ResizeHandle({ onResizeStart, onResize, onResizeEnd, side, currentWidth, minWidth, maxWidth }: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = currentWidth

    // Signal resize has started
    onResizeStart()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      // For left sidebar (right edge): dragging right increases width
      // For right sidebar (left edge): dragging left increases width
      const newWidth = side === 'right' ? startWidth + deltaX : startWidth - deltaX
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      onResize(constrainedWidth)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      // Signal resize has ended
      onResizeEnd()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-fluid-cyan/20 transition-colors ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{ zIndex: 20 }}
    />
  )
}

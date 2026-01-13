import { Icons } from '../icons/Icons'

interface ConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
}

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md bg-fluid-bg-surface rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <h2 className="text-lg font-semibold text-fluid-text-primary">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-fluid-text-muted">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(255,255,255,0.05)]">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-fluid-text-primary hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isDestructive
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 shadow-[inset_0_1px_0_rgba(248,113,113,0.3),0_2px_8px_rgba(239,68,68,0.2)]'
                : 'bg-[rgba(45,212,191,0.15)] text-fluid-cyan hover:bg-[rgba(45,212,191,0.2)] shadow-[inset_0_1px_0_rgba(45,212,191,0.3),0_2px_8px_rgba(45,212,191,0.2)]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

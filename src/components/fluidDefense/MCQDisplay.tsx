import { useState } from 'react'
import type { MCQFluidDefense } from '../../types/course'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { Badge } from '../shared/Badge'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { FluidDefenseForm } from './FluidDefenseForm'
import { useCourseStore } from '../../store/courseStore'

interface MCQDisplayProps {
  chapterId: number
  defense: MCQFluidDefense
}

export function MCQDisplay({ chapterId, defense }: MCQDisplayProps) {
  const deleteFluidDefense = useCourseStore((state) => state.deleteFluidDefense)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    deleteFluidDefense(chapterId, defense.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className="rounded-xl bg-[rgba(255,255,255,0.03)] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.2)]">
        <div className="p-3 flex items-center gap-2 border-b border-[rgba(255,255,255,0.05)]">
          <span className="text-fluid-purple">
            <Icons.Lightbulb />
          </span>
          <Badge variant="primary">MCQ</Badge>
          <span className="font-medium text-sm flex-1">
            {defense.options.length} Options
          </span>
          <div className="flex items-center gap-1">
            <IconButton
              icon={<Icons.Edit />}
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              title="Edit MCQ"
            />
            <IconButton
              icon={<Icons.Trash />}
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
              size="sm"
              title="Delete MCQ"
            />
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="font-medium text-sm">{defense.question}</div>
          {defense.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 text-sm p-2 rounded ${
                index === defense.correctOptionIndex
                  ? 'bg-green-500/10 text-green-400'
                  : 'text-fluid-text-muted'
              }`}
            >
              <span className="text-fluid-text-muted text-xs">{index + 1}</span>
              <span>{option}</span>
              {index === defense.correctOptionIndex && (
                <Icons.Check />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <FluidDefenseForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        chapterId={chapterId}
        defense={defense}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Assessment"
        message="Are you sure you want to delete this MCQ assessment?"
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

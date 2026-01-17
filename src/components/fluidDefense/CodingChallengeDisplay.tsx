import { useState } from 'react'
import type { CodingChallengeFluidDefense } from '../../types/course'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { Badge } from '../shared/Badge'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { FluidDefenseForm } from './FluidDefenseForm'
import { useCourseStore } from '../../store/courseStore'

interface CodingChallengeDisplayProps {
  chapterId: number
  defense: CodingChallengeFluidDefense
}

export function CodingChallengeDisplay({
  chapterId,
  defense,
}: CodingChallengeDisplayProps) {
  const deleteFluidDefense = useCourseStore((state) => state.deleteFluidDefense)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    deleteFluidDefense(chapterId, defense.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className="rounded-xl bg-[rgba(255,255,255,0.03)] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.2)]">
        <div
          className={`p-3 flex items-center gap-2 cursor-pointer ${isExpanded ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="text-fluid-text-muted">
            {isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
          </button>
          <span className="text-amber-400">
            <Icons.Terminal />
          </span>
          <Badge variant="warning">CODING CHALLENGE</Badge>
          <span className="font-medium text-sm flex-1">
            {defense.question.substring(0, 50)}...
          </span>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon={<Icons.Edit />}
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              title="Edit coding challenge"
            />
            <IconButton
              icon={<Icons.Trash />}
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
              size="sm"
              title="Delete coding challenge"
            />
          </div>
        </div>
        <div className={`assessment-expandable-content ${isExpanded ? 'expanded' : ''}`}>
          <div className="px-4">
            <div className="font-medium text-sm">{defense.question}</div>
            <div className="text-xs text-fluid-text-muted">
              Success Criteria: {defense.successCriteria}
            </div>
          </div>
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
        message="Are you sure you want to delete this coding challenge?"
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

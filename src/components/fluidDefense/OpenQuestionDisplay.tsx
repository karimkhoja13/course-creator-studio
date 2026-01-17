import { useState } from 'react'
import type { OpenQuestionFluidDefense } from '../../types/course'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { Badge } from '../shared/Badge'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { FluidDefenseForm } from './FluidDefenseForm'
import { useCourseStore } from '../../store/courseStore'

interface OpenQuestionDisplayProps {
  chapterId: number
  defense: OpenQuestionFluidDefense
}

export function OpenQuestionDisplay({
  chapterId,
  defense,
}: OpenQuestionDisplayProps) {
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
          <span className="text-fluid-cyan">
            <Icons.BookOpen />
          </span>
          <Badge variant="primary">OPEN QUESTION</Badge>
          <span className="font-medium text-sm flex-1">
            {defense.evaluationCriteria.length} Criteria
          </span>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon={<Icons.Edit />}
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              title="Edit open question"
            />
            <IconButton
              icon={<Icons.Trash />}
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
              size="sm"
              title="Delete open question"
            />
          </div>
        </div>
        <div className={`assessment-expandable-content ${isExpanded ? 'expanded' : ''}`}>
          <div className="p-3 space-y-2">
            <div className="font-medium text-sm">{defense.question}</div>
            <div className="text-xs text-fluid-text-muted">
              Evaluation Criteria:
              <ul className="list-disc list-inside mt-1">
                {defense.evaluationCriteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
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
        message="Are you sure you want to delete this open question?"
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

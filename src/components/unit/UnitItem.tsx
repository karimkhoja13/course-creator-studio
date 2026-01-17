import { useState } from 'react'
import type { Unit } from '../../types/course'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { UnitForm } from './UnitForm'
import { DirectiveDisplay } from './DirectiveDisplay'
import { AttachmentList } from '../attachment/AttachmentList'
import { useCourseStore } from '../../store/courseStore'

interface UnitItemProps {
  chapterId: number
  unit: Unit
}

export function UnitItem({ chapterId, unit }: UnitItemProps) {
  const deleteUnit = useCourseStore((state) => state.deleteUnit)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    deleteUnit(chapterId, unit.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className="rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
        {/* Always-visible header with toggle */}
        <div className="p-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <button className="text-fluid-text-muted">
              {isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
            </button>
            <h4 className="text-base font-semibold text-fluid-text-primary">
              {unit.title}
            </h4>
          </div>
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              icon={<Icons.Edit />}
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              title="Edit unit"
            />
            <IconButton
              icon={<Icons.Trash />}
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
              size="sm"
              title="Delete unit"
            />
          </div>
        </div>

        {/* Collapsible content */}
        <div className={`unit-expandable-content ${isExpanded ? 'expanded' : ''}`}>
          <div className="px-4 pb-4">
            <DirectiveDisplay directive={unit.directive} />
            {unit.attachments.length > 0 && (
              <div className="mt-4">
                <AttachmentList
                  chapterId={chapterId}
                  unitId={unit.id}
                  attachments={unit.attachments}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <UnitForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        chapterId={chapterId}
        unit={unit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Unit"
        message={`Are you sure you want to delete "${unit.title}"? This will also delete ${unit.attachments.length} attachments.`}
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

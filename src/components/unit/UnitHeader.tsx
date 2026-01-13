import { useState } from 'react'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { UnitForm } from './UnitForm'
import type { Unit } from '../../types/course'
import { useCourseStore } from '../../store/courseStore'

interface UnitHeaderProps {
  chapterId: number
  unit: Unit
}

export function UnitHeader({ chapterId, unit }: UnitHeaderProps) {
  const deleteUnit = useCourseStore((state) => state.deleteUnit)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    deleteUnit(chapterId, unit.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-semibold text-fluid-text-primary">
          {unit.title}
        </h4>
        <div className="flex items-center gap-1">
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

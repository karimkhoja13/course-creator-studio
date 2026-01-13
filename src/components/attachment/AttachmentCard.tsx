import { useState } from 'react'
import type { Attachment } from '../../types/course'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { AttachmentForm } from './AttachmentForm'
import { useCourseStore } from '../../store/courseStore'
import { isCodeRefAttachment } from '../../types/course'

interface AttachmentCardProps {
  chapterId: number
  unitId: number
  attachment: Attachment
}

export function AttachmentCard({
  chapterId,
  unitId,
  attachment,
}: AttachmentCardProps) {
  const deleteAttachment = useCourseStore((state) => state.deleteAttachment)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    deleteAttachment(chapterId, unitId, attachment.id)
    setShowDeleteConfirm(false)
  }

  const icon = isCodeRefAttachment(attachment) ? <Icons.Code /> : <Icons.Pdf />
  const color = isCodeRefAttachment(attachment)
    ? 'text-fluid-purple'
    : 'text-red-400'

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)]">
        <span className={color}>{icon}</span>
        <div className="flex-1 text-sm">
          {isCodeRefAttachment(attachment) && (
            <>
              <span className="text-fluid-text-muted">{attachment.filePath}</span>
              {attachment.commitHash && (
                <span className="text-fluid-text-muted/50 text-xs ml-2">
                  ({attachment.commitHash.substring(0, 7)})
                </span>
              )}
            </>
          )}
          {!isCodeRefAttachment(attachment) && (
            <span className="text-fluid-text-muted">Document Reference</span>
          )}
        </div>
        <span className="text-xs text-fluid-text-muted">{attachment.note}</span>
        <div className="flex items-center gap-1">
          <IconButton
            icon={<Icons.Edit />}
            onClick={() => setIsEditing(true)}
            variant="primary"
            size="sm"
            title="Edit attachment"
          />
          <IconButton
            icon={<Icons.Trash />}
            onClick={() => setShowDeleteConfirm(true)}
            variant="danger"
            size="sm"
            title="Delete attachment"
          />
        </div>
      </div>

      {/* Edit Modal */}
      <AttachmentForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        chapterId={chapterId}
        unitId={unitId}
        attachment={attachment}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Attachment"
        message="Are you sure you want to delete this attachment?"
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

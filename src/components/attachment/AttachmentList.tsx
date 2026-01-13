import { useState } from 'react'
import type { Attachment } from '../../types/course'
import { AttachmentCard } from './AttachmentCard'
import { AttachmentForm } from './AttachmentForm'
import { Icons } from '../icons/Icons'

interface AttachmentListProps {
  chapterId: number
  unitId: number
  attachments: Attachment[]
}

export function AttachmentList({
  chapterId,
  unitId,
  attachments,
}: AttachmentListProps) {
  const [isAddingAttachment, setIsAddingAttachment] = useState(false)

  return (
    <div className="space-y-2">
      <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-2">
        Attachments
      </div>
      {attachments.map((attachment) => (
        <AttachmentCard
          key={attachment.id}
          chapterId={chapterId}
          unitId={unitId}
          attachment={attachment}
        />
      ))}
      <button
        onClick={() => setIsAddingAttachment(true)}
        className="flex items-center gap-2 text-xs text-fluid-text-muted hover:text-fluid-cyan transition-colors"
      >
        <Icons.Plus />
        Add Attachment
      </button>

      {/* Add Attachment Modal */}
      <AttachmentForm
        isOpen={isAddingAttachment}
        onClose={() => setIsAddingAttachment(false)}
        chapterId={chapterId}
        unitId={unitId}
      />
    </div>
  )
}

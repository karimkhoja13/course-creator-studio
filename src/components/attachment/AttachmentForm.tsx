import { useState, useEffect } from 'react'
import { Modal } from '../shared/Modal'
import { useCourseStore } from '../../store/courseStore'
import type { Attachment, AttachmentType } from '../../types/course'
import { validateAttachment } from '../../utils/validation'

interface AttachmentFormProps {
  isOpen: boolean
  onClose: () => void
  chapterId: number
  unitId: number
  attachment?: Attachment
}

export function AttachmentForm({
  isOpen,
  onClose,
  chapterId,
  unitId,
  attachment,
}: AttachmentFormProps) {
  const addAttachment = useCourseStore((state) => state.addAttachment)
  const updateAttachment = useCourseStore((state) => state.updateAttachment)

  const [formData, setFormData] = useState<{
    type: AttachmentType
    note: string
    filePath?: string
    commitHash?: string
  }>({
    type: 'CODE_REF',
    note: '',
    filePath: '',
    commitHash: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form when editing
  useEffect(() => {
    if (attachment) {
      setFormData({
        type: attachment.type,
        note: attachment.note,
        filePath: attachment.type === 'CODE_REF' ? attachment.filePath : '',
        commitHash:
          attachment.type === 'CODE_REF' ? attachment.commitHash || '' : '',
      })
    } else {
      setFormData({
        type: 'CODE_REF',
        note: '',
        filePath: '',
        commitHash: '',
      })
    }
    setErrors({})
  }, [attachment, isOpen])

  const handleSubmit = () => {
    const validation = validateAttachment(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    const attachmentData: any = {
      type: formData.type,
      note: formData.note,
    }

    if (formData.type === 'CODE_REF') {
      attachmentData.filePath = formData.filePath
      if (formData.commitHash) {
        attachmentData.commitHash = formData.commitHash
      }
    }

    if (attachment) {
      updateAttachment(chapterId, unitId, attachment.id, attachmentData)
    } else {
      addAttachment(chapterId, unitId, attachmentData)
    }

    onClose()
  }

  const isValid = validateAttachment(formData).isValid

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={attachment ? 'Edit Attachment' : 'Add Attachment'}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-fluid-text-primary hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-4 py-2 rounded-lg bg-[rgba(45,212,191,0.15)] text-fluid-cyan font-medium transition-all duration-200 hover:bg-[rgba(45,212,191,0.2)] shadow-[inset_0_1px_0_rgba(45,212,191,0.3),0_2px_8px_rgba(45,212,191,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {attachment ? 'Save Changes' : 'Add Attachment'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Type *
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFormData({ ...formData, type: 'CODE_REF' })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                formData.type === 'CODE_REF'
                  ? 'bg-[rgba(45,212,191,0.15)] text-fluid-cyan'
                  : 'bg-[rgba(255,255,255,0.04)] text-fluid-text-muted hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              Code Reference
            </button>
            <button
              onClick={() => setFormData({ ...formData, type: 'DOC_REF' })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                formData.type === 'DOC_REF'
                  ? 'bg-[rgba(45,212,191,0.15)] text-fluid-cyan'
                  : 'bg-[rgba(255,255,255,0.04)] text-fluid-text-muted hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              Document Reference
            </button>
          </div>
        </div>

        {/* File Path (CODE_REF only) */}
        {formData.type === 'CODE_REF' && (
          <div>
            <label className="block text-sm font-medium text-fluid-text-primary mb-2">
              File Path *
            </label>
            <input
              type="text"
              value={formData.filePath}
              onChange={(e) =>
                setFormData({ ...formData, filePath: e.target.value })
              }
              className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent font-mono"
              placeholder="src/agent_state.py"
            />
            {errors.filePath && (
              <p className="text-xs text-red-400 mt-1">{errors.filePath}</p>
            )}
          </div>
        )}

        {/* Commit Hash (CODE_REF only) */}
        {formData.type === 'CODE_REF' && (
          <div>
            <label className="block text-sm font-medium text-fluid-text-primary mb-2">
              Commit Hash (Optional)
            </label>
            <input
              type="text"
              value={formData.commitHash}
              onChange={(e) =>
                setFormData({ ...formData, commitHash: e.target.value })
              }
              className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent font-mono"
              placeholder="a1b2c3d4"
            />
          </div>
        )}

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Note *
          </label>
          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData({ ...formData, note: e.target.value })
            }
            rows={3}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
            placeholder="Focus on the hardcoded execution sequence..."
          />
          {errors.note && (
            <p className="text-xs text-red-400 mt-1">{errors.note}</p>
          )}
        </div>
      </div>
    </Modal>
  )
}

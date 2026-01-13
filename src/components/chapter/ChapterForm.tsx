import { useState, useEffect } from 'react'
import { Modal } from '../shared/Modal'
import { useCourseStore } from '../../store/courseStore'
import type { Chapter } from '../../types/course'
import { validateChapter } from '../../utils/validation'

interface ChapterFormProps {
  isOpen: boolean
  onClose: () => void
  chapter?: Chapter
}

export function ChapterForm({ isOpen, onClose, chapter }: ChapterFormProps) {
  const course = useCourseStore((state) => state.course)
  const addChapter = useCourseStore((state) => state.addChapter)
  const updateChapter = useCourseStore((state) => state.updateChapter)

  const [formData, setFormData] = useState({
    title: '',
    learningObjective: '',
    sequenceOrder: course.chapters.length + 1,
    endCodeState: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form when editing
  useEffect(() => {
    if (chapter) {
      setFormData({
        title: chapter.title,
        learningObjective: chapter.learningObjective,
        sequenceOrder: chapter.sequenceOrder,
        endCodeState: chapter.endCodeState,
      })
    } else {
      setFormData({
        title: '',
        learningObjective: '',
        sequenceOrder: course.chapters.length + 1,
        endCodeState: '',
      })
    }
    setErrors({})
  }, [chapter, course.chapters.length, isOpen])

  const handleSubmit = () => {
    const validation = validateChapter(formData, course, chapter?.id)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (chapter) {
      updateChapter(chapter.id, formData)
    } else {
      addChapter(formData)
    }

    onClose()
  }

  const isValid = validateChapter(formData, course, chapter?.id).isValid

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={chapter ? 'Edit Chapter' : 'Add Chapter'}
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
            {chapter ? 'Save Changes' : 'Add Chapter'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
            placeholder="e.g., The Loop: Breaking Linearity"
          />
          {errors.title && (
            <p className="text-xs text-red-400 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Learning Objective */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Learning Objective *
          </label>
          <textarea
            value={formData.learningObjective}
            onChange={(e) =>
              setFormData({ ...formData, learningObjective: e.target.value })
            }
            rows={3}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
            placeholder="Understand why linear chains fail..."
          />
          {errors.learningObjective && (
            <p className="text-xs text-red-400 mt-1">
              {errors.learningObjective}
            </p>
          )}
        </div>

        {/* Sequence Order */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Sequence Order
          </label>
          <input
            type="number"
            value={formData.sequenceOrder}
            onChange={(e) =>
              setFormData({
                ...formData,
                sequenceOrder: parseInt(e.target.value),
              })
            }
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
          />
          {errors.sequenceOrder && (
            <p className="text-xs text-red-400 mt-1">{errors.sequenceOrder}</p>
          )}
        </div>

        {/* End Code State */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            End Code State
          </label>
          <textarea
            value={formData.endCodeState}
            onChange={(e) =>
              setFormData({ ...formData, endCodeState: e.target.value })
            }
            rows={4}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none font-mono"
            placeholder="Describe the state of the codebase at the end of this chapter..."
          />
        </div>
      </div>
    </Modal>
  )
}

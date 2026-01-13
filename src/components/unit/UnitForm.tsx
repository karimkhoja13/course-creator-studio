import { useState, useEffect } from 'react'
import { Modal } from '../shared/Modal'
import { useCourseStore } from '../../store/courseStore'
import type { Unit } from '../../types/course'
import { validateUnit } from '../../utils/validation'

interface UnitFormProps {
  isOpen: boolean
  onClose: () => void
  chapterId: number
  unit?: Unit
}

export function UnitForm({ isOpen, onClose, chapterId, unit }: UnitFormProps) {
  const addUnit = useCourseStore((state) => state.addUnit)
  const updateUnit = useCourseStore((state) => state.updateUnit)

  const [formData, setFormData] = useState({
    title: '',
    directive: '',
    endCodeState: '',
    realizationPoints: [] as Array<{
      concept: string
      suggestedApproach: string
      hints: string[]
    }>,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form when editing
  useEffect(() => {
    if (unit) {
      setFormData({
        title: unit.title,
        directive: unit.directive,
        endCodeState: unit.endCodeState,
        realizationPoints: unit.realizationPoints,
      })
    } else {
      setFormData({
        title: '',
        directive: '',
        endCodeState: '',
        realizationPoints: [],
      })
    }
    setErrors({})
  }, [unit, isOpen])

  const handleSubmit = () => {
    const validation = validateUnit(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (unit) {
      updateUnit(chapterId, unit.id, formData)
    } else {
      addUnit(chapterId, formData)
    }

    onClose()
  }

  const isValid = validateUnit(formData).isValid

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={unit ? 'Edit Unit' : 'Add Unit'}
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
            {unit ? 'Save Changes' : 'Add Unit'}
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
            placeholder="e.g., The Problem with Chains"
          />
          {errors.title && (
            <p className="text-xs text-red-400 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Directive */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Directive *
          </label>
          <textarea
            value={formData.directive}
            onChange={(e) =>
              setFormData({ ...formData, directive: e.target.value })
            }
            rows={6}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
            placeholder="Explain the teaching approach for this unit..."
          />
          {errors.directive && (
            <p className="text-xs text-red-400 mt-1">{errors.directive}</p>
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
            rows={3}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none font-mono"
            placeholder="Describe the code state after this unit..."
          />
        </div>
      </div>
    </Modal>
  )
}

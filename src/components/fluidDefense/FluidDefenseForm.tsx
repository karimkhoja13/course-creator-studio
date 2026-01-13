import { useState, useEffect } from 'react'
import { Modal } from '../shared/Modal'
import { useCourseStore } from '../../store/courseStore'
import type { FluidDefense, FluidDefenseType } from '../../types/course'
import { validateFluidDefense } from '../../utils/validation'
import { Icons } from '../icons/Icons'

interface FluidDefenseFormProps {
  isOpen: boolean
  onClose: () => void
  chapterId: number
  defense?: FluidDefense
}

export function FluidDefenseForm({
  isOpen,
  onClose,
  chapterId,
  defense,
}: FluidDefenseFormProps) {
  const addFluidDefense = useCourseStore((state) => state.addFluidDefense)
  const updateFluidDefense = useCourseStore((state) => state.updateFluidDefense)

  const [step, setStep] = useState<'type-selection' | 'form'>('type-selection')
  const [selectedType, setSelectedType] = useState<FluidDefenseType | null>(
    null
  )
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form when editing
  useEffect(() => {
    if (defense) {
      setStep('form')
      setSelectedType(defense.type)
      if (defense.type === 'MCQ') {
        setFormData({
          type: 'MCQ',
          question: defense.question,
          options: defense.options,
          correctOptionIndex: defense.correctOptionIndex,
          progressiveHints: defense.progressiveHints || [],
          followUpQuestion: defense.followUpQuestion || '',
        })
      } else if (defense.type === 'CODING_CHALLENGE') {
        setFormData({
          type: 'CODING_CHALLENGE',
          question: defense.question,
          startState: defense.startState,
          solutionState: defense.solutionState,
          successCriteria: defense.successCriteria,
          progressiveHints: defense.progressiveHints || [],
        })
      } else if (defense.type === 'OPEN_QUESTION') {
        setFormData({
          type: 'OPEN_QUESTION',
          question: defense.question,
          evaluationCriteria: defense.evaluationCriteria,
          progressiveHints: defense.progressiveHints || [],
        })
      }
    } else {
      setStep('type-selection')
      setSelectedType(null)
      setFormData({})
    }
    setErrors({})
  }, [defense, isOpen])

  const handleTypeSelect = (type: FluidDefenseType) => {
    setSelectedType(type)
    if (type === 'MCQ') {
      setFormData({
        type: 'MCQ',
        question: '',
        options: ['', ''],
        correctOptionIndex: 0,
        progressiveHints: [],
        followUpQuestion: '',
      })
    } else if (type === 'CODING_CHALLENGE') {
      setFormData({
        type: 'CODING_CHALLENGE',
        question: '',
        startState: '',
        solutionState: '',
        successCriteria: '',
        progressiveHints: [],
      })
    } else if (type === 'OPEN_QUESTION') {
      setFormData({
        type: 'OPEN_QUESTION',
        question: '',
        evaluationCriteria: [''],
        progressiveHints: [],
      })
    }
    setStep('form')
  }

  const handleSubmit = () => {
    const validation = validateFluidDefense(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (defense) {
      updateFluidDefense(chapterId, defense.id, formData)
    } else {
      addFluidDefense(chapterId, formData)
    }

    onClose()
  }

  const isValid = formData.type ? validateFluidDefense(formData).isValid : false

  if (step === 'type-selection' && !defense) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Select Assessment Type">
        <div className="space-y-3">
          <button
            onClick={() => handleTypeSelect('MCQ')}
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] hover:border-fluid-cyan transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icons.Lightbulb />
              <span className="font-semibold">Multiple Choice Question</span>
            </div>
            <p className="text-sm text-fluid-text-muted">
              Quiz with multiple options and one correct answer
            </p>
          </button>

          <button
            onClick={() => handleTypeSelect('CODING_CHALLENGE')}
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] hover:border-fluid-cyan transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icons.Terminal />
              <span className="font-semibold">Coding Challenge</span>
            </div>
            <p className="text-sm text-fluid-text-muted">
              Hands-on coding task with starting code and solution
            </p>
          </button>

          <button
            onClick={() => handleTypeSelect('OPEN_QUESTION')}
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] hover:border-fluid-cyan transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icons.BookOpen />
              <span className="font-semibold">Open Question</span>
            </div>
            <p className="text-sm text-fluid-text-muted">
              Free-form question with evaluation criteria
            </p>
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        defense
          ? 'Edit Assessment'
          : `Add ${selectedType === 'MCQ' ? 'MCQ' : selectedType === 'CODING_CHALLENGE' ? 'Coding Challenge' : 'Open Question'}`
      }
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
            {defense ? 'Save Changes' : 'Add Assessment'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-fluid-text-primary mb-2">
            Question *
          </label>
          <textarea
            value={formData.question || ''}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            rows={3}
            className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
            placeholder="Enter your question..."
          />
          {errors.question && (
            <p className="text-xs text-red-400 mt-1">{errors.question}</p>
          )}
        </div>

        {/* MCQ-specific fields */}
        {selectedType === 'MCQ' && (
          <>
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Options * (at least 2)
              </label>
              {formData.options?.map((option: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.options]
                      newOptions[index] = e.target.value
                      setFormData({ ...formData, options: newOptions })
                    }}
                    className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                  {formData.options.length > 2 && (
                    <button
                      onClick={() => {
                        const newOptions = formData.options.filter(
                          (_: any, i: number) => i !== index
                        )
                        setFormData({ ...formData, options: newOptions })
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                    >
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    options: [...formData.options, ''],
                  })
                }
                className="text-sm text-fluid-cyan hover:underline"
              >
                + Add Option
              </button>
              {errors.options && (
                <p className="text-xs text-red-400 mt-1">{errors.options}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Correct Option Index *
              </label>
              <input
                type="number"
                value={formData.correctOptionIndex ?? 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctOptionIndex: parseInt(e.target.value),
                  })
                }
                min={0}
                max={(formData.options?.length || 1) - 1}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
              />
              {errors.correctOptionIndex && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.correctOptionIndex}
                </p>
              )}
            </div>
          </>
        )}

        {/* Coding Challenge-specific fields */}
        {selectedType === 'CODING_CHALLENGE' && (
          <>
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Start State *
              </label>
              <textarea
                value={formData.startState || ''}
                onChange={(e) =>
                  setFormData({ ...formData, startState: e.target.value })
                }
                rows={4}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none font-mono"
                placeholder="Initial code state..."
              />
              {errors.startState && (
                <p className="text-xs text-red-400 mt-1">{errors.startState}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Solution State *
              </label>
              <textarea
                value={formData.solutionState || ''}
                onChange={(e) =>
                  setFormData({ ...formData, solutionState: e.target.value })
                }
                rows={4}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none font-mono"
                placeholder="Solution code..."
              />
              {errors.solutionState && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.solutionState}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Success Criteria *
              </label>
              <input
                type="text"
                value={formData.successCriteria || ''}
                onChange={(e) =>
                  setFormData({ ...formData, successCriteria: e.target.value })
                }
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                placeholder="What makes a solution correct?"
              />
              {errors.successCriteria && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.successCriteria}
                </p>
              )}
            </div>
          </>
        )}

        {/* Open Question-specific fields */}
        {selectedType === 'OPEN_QUESTION' && (
          <div>
            <label className="block text-sm font-medium text-fluid-text-primary mb-2">
              Evaluation Criteria * (at least 1)
            </label>
            {formData.evaluationCriteria?.map(
              (criteria: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={criteria}
                    onChange={(e) => {
                      const newCriteria = [...formData.evaluationCriteria]
                      newCriteria[index] = e.target.value
                      setFormData({ ...formData, evaluationCriteria: newCriteria })
                    }}
                    className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                    placeholder={`Criteria ${index + 1}`}
                  />
                  {formData.evaluationCriteria.length > 1 && (
                    <button
                      onClick={() => {
                        const newCriteria = formData.evaluationCriteria.filter(
                          (_: any, i: number) => i !== index
                        )
                        setFormData({
                          ...formData,
                          evaluationCriteria: newCriteria,
                        })
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                    >
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              )
            )}
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  evaluationCriteria: [...formData.evaluationCriteria, ''],
                })
              }
              className="text-sm text-fluid-cyan hover:underline"
            >
              + Add Criteria
            </button>
            {errors.evaluationCriteria && (
              <p className="text-xs text-red-400 mt-1">
                {errors.evaluationCriteria}
              </p>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}

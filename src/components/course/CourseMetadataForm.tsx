import { useState, useEffect } from 'react'
import { Modal } from '../shared/Modal'
import { useCourseStore } from '../../store/courseStore'
import type { Speaker } from '../../types/course'
import { validateCourseMetadata } from '../../utils/validation'
import { Icons } from '../icons/Icons'
import { generateId } from '../../utils/idGenerator'

interface CourseMetadataFormProps {
  isOpen: boolean
  onClose: () => void
}

export function CourseMetadataForm({ isOpen, onClose }: CourseMetadataFormProps) {
  const course = useCourseStore((state) => state.course)
  const updateCourseMetadata = useCourseStore((state) => state.updateCourseMetadata)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    initialCodeState: '',
    repository: {
      repoUrl: '',
      branch: '',
      devContainerConfigUrl: '',
    },
    speakers: [] as Speaker[],
    northStar: {
      targetAudience: '',
      prerequisites: '',
      transformationDescription: '',
      gapAndFriction: '',
      capstoneProject: {
        title: '',
        description: '',
      },
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form from course data
  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        title: course.title,
        description: course.description,
        initialCodeState: course.initialCodeState,
        repository: { ...course.repository },
        speakers: course.speakers.map((s) => ({ ...s })), // Deep copy
        northStar: {
          targetAudience: course.northStar.targetAudience,
          prerequisites: course.northStar.prerequisites,
          transformationDescription: course.northStar.transformationDescription,
          gapAndFriction: course.northStar.gapAndFriction,
          capstoneProject: {
            title: course.northStar.capstoneProject.title,
            description: course.northStar.capstoneProject.description,
          },
        },
      })
      setErrors({})
    }
  }, [course, isOpen])

  const handleSubmit = () => {
    const validation = validateCourseMetadata(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    updateCourseMetadata(formData)
    onClose()
  }

  // Speaker management functions
  const addSpeaker = () => {
    setFormData({
      ...formData,
      speakers: [
        ...formData.speakers,
        { id: generateId(), name: '', personality: '' },
      ],
    })
  }

  const removeSpeaker = (index: number) => {
    if (formData.speakers.length <= 1) return // Minimum 1 speaker
    const newSpeakers = formData.speakers.filter((_, i) => i !== index)
    setFormData({ ...formData, speakers: newSpeakers })
  }

  const updateSpeaker = (
    index: number,
    field: 'name' | 'personality',
    value: string
  ) => {
    const newSpeakers = [...formData.speakers]
    newSpeakers[index] = { ...newSpeakers[index], [field]: value }
    setFormData({ ...formData, speakers: newSpeakers })
  }

  const isValid = validateCourseMetadata(formData).isValid

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Course Metadata"
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
            Save Changes
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* SECTION 1: Basic Information */}
        <div>
          <h3 className="text-xs text-fluid-text-muted uppercase tracking-wider mb-3">
            Basic Information
          </h3>
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
                placeholder="Course title"
              />
              {errors.title && (
                <p className="text-xs text-red-400 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                placeholder="Brief course description"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Initial Code State */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Initial Code State
              </label>
              <textarea
                value={formData.initialCodeState}
                onChange={(e) =>
                  setFormData({ ...formData, initialCodeState: e.target.value })
                }
                rows={4}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none font-mono"
                placeholder="Initial state of the codebase..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Repository */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <h3 className="text-xs text-fluid-text-muted uppercase tracking-wider mb-3">
            Repository
          </h3>
          <div className="space-y-4">
            {/* Repository URL */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Repository URL *
              </label>
              <input
                type="text"
                value={formData.repository.repoUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repository: { ...formData.repository, repoUrl: e.target.value },
                  })
                }
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                placeholder="https://github.com/..."
              />
              {errors.repoUrl && (
                <p className="text-xs text-red-400 mt-1">{errors.repoUrl}</p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Branch *
              </label>
              <input
                type="text"
                value={formData.repository.branch}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repository: { ...formData.repository, branch: e.target.value },
                  })
                }
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                placeholder="main"
              />
              {errors.branch && (
                <p className="text-xs text-red-400 mt-1">{errors.branch}</p>
              )}
            </div>

            {/* Dev Container Config URL */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Dev Container Config URL *
              </label>
              <input
                type="text"
                value={formData.repository.devContainerConfigUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repository: {
                      ...formData.repository,
                      devContainerConfigUrl: e.target.value,
                    },
                  })
                }
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                placeholder=".devcontainer/devcontainer.json"
              />
              {errors.devContainerConfigUrl && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.devContainerConfigUrl}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Speakers */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <h3 className="text-xs text-fluid-text-muted uppercase tracking-wider mb-3">
            Speakers
          </h3>
          <div className="space-y-3">
            {formData.speakers.map((speaker, index) => (
              <div
                key={speaker.id}
                className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-fluid-text-muted">
                    Speaker {index + 1}
                  </span>
                  {formData.speakers.length > 1 && (
                    <button
                      onClick={() => removeSpeaker(index)}
                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-fluid-text-primary mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={speaker.name}
                      onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-3 py-2 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                      placeholder="Speaker name"
                    />
                    {errors[`speaker_${index}_name`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`speaker_${index}_name`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-fluid-text-primary mb-1.5">
                      Personality *
                    </label>
                    <textarea
                      value={speaker.personality}
                      onChange={(e) =>
                        updateSpeaker(index, 'personality', e.target.value)
                      }
                      rows={3}
                      className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-3 py-2 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                      placeholder="Describe the speaker's personality and teaching style..."
                    />
                    {errors[`speaker_${index}_personality`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`speaker_${index}_personality`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addSpeaker}
              className="flex items-center gap-2 text-sm text-fluid-cyan hover:underline"
            >
              <Icons.Plus />
              Add Speaker
            </button>
            {errors.speakers && (
              <p className="text-xs text-red-400">{errors.speakers}</p>
            )}
          </div>
        </div>

        {/* SECTION 4: North Star */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <h3 className="text-xs text-fluid-text-muted uppercase tracking-wider mb-3">
            North Star
          </h3>
          <div className="space-y-4">
            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.northStar.targetAudience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    northStar: {
                      ...formData.northStar,
                      targetAudience: e.target.value,
                    },
                  })
                }
                rows={2}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                placeholder="Who is this course for?"
              />
              {errors.targetAudience && (
                <p className="text-xs text-red-400 mt-1">{errors.targetAudience}</p>
              )}
            </div>

            {/* Prerequisites */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Prerequisites *
              </label>
              <textarea
                value={formData.northStar.prerequisites}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    northStar: {
                      ...formData.northStar,
                      prerequisites: e.target.value,
                    },
                  })
                }
                rows={2}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                placeholder="What should students know before starting?"
              />
              {errors.prerequisites && (
                <p className="text-xs text-red-400 mt-1">{errors.prerequisites}</p>
              )}
            </div>

            {/* Transformation Description */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Transformation Description *
              </label>
              <textarea
                value={formData.northStar.transformationDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    northStar: {
                      ...formData.northStar,
                      transformationDescription: e.target.value,
                    },
                  })
                }
                rows={2}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                placeholder="Point A → Point B transformation"
              />
              {errors.transformationDescription && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.transformationDescription}
                </p>
              )}
            </div>

            {/* Gap and Friction */}
            <div>
              <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                Gap and Friction *
              </label>
              <textarea
                value={formData.northStar.gapAndFriction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    northStar: {
                      ...formData.northStar,
                      gapAndFriction: e.target.value,
                    },
                  })
                }
                rows={2}
                className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                placeholder="What problems does this course solve?"
              />
              {errors.gapAndFriction && (
                <p className="text-xs text-red-400 mt-1">{errors.gapAndFriction}</p>
              )}
            </div>

            {/* Capstone Project */}
            <div className="pt-3 border-t border-[rgba(255,255,255,0.03)]">
              <h4 className="text-xs text-fluid-text-muted uppercase tracking-wider mb-3">
                Capstone Project
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.northStar.capstoneProject.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        northStar: {
                          ...formData.northStar,
                          capstoneProject: {
                            ...formData.northStar.capstoneProject,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent"
                    placeholder="Capstone project title"
                  />
                  {errors.capstoneTitle && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.capstoneTitle}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-fluid-text-primary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.northStar.capstoneProject.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        northStar: {
                          ...formData.northStar,
                          capstoneProject: {
                            ...formData.northStar.capstoneProject,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    rows={3}
                    className="w-full bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2.5 text-sm text-fluid-text-primary placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all border border-transparent resize-none"
                    placeholder="What will students build?"
                  />
                  {errors.capstoneDescription && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.capstoneDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

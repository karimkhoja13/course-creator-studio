import { useState } from 'react'
import { Icons } from '../icons/Icons'
import { useCourseStore } from '../../store/courseStore'
import { CourseMetadataForm } from './CourseMetadataForm'

export function CourseMetadataPanel() {
  const course = useCourseStore((state) => state?.course)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Safety check - if course is undefined, don't render
  if (!course) {
    return null
  }

  if (!isExpanded) {
    return (
      <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-sm text-fluid-text-muted hover:text-fluid-text-primary transition-colors"
          >
            <Icons.ChevronRight />
            <span>Course Metadata</span>
          </button>
          <button
            className="invisible flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(45,212,191,0.1)] text-fluid-cyan"
          >
            <Icons.Edit />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(false)}
          className="flex items-center gap-2 text-sm text-fluid-text-muted hover:text-fluid-text-primary transition-colors"
        >
          <Icons.ChevronDown />
          <span>Course Metadata</span>
        </button>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(45,212,191,0.1)] text-fluid-cyan hover:bg-[rgba(45,212,191,0.15)] transition-colors"
        >
          <Icons.Edit />
          <span className="text-sm">Edit</span>
        </button>
      </div>

      <div className="ml-6 space-y-4">
        {/* Course Title */}
        <div>
          <h2 className="text-xl font-semibold text-fluid-text-primary mb-2">
            {course.title}
          </h2>
          <p className="text-sm text-fluid-text-muted">{course.description}</p>
        </div>

        {/* Repository */}
        <div>
          <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-2">
            Repository
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <Icons.Code />
              <a
                href={course.repository.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fluid-cyan hover:underline"
              >
                {course.repository.repoUrl}
              </a>
              <span className="text-fluid-text-muted">
                ({course.repository.branch})
              </span>
            </div>
            <div>
              <span className="text-fluid-text-muted">Dev Container: </span>
              <span className="text-fluid-text-primary">
                {course.repository.devContainerConfigUrl}
              </span>
            </div>
          </div>
        </div>

        {/* Speakers */}
        <div>
          <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-2">
            Speakers
          </div>
          <div className="flex gap-2">
            {course.speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] text-sm"
              >
                <span className="font-medium">{speaker.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* North Star */}
        <div>
          <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-2">
            North Star
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-fluid-text-muted">Transformation: </span>
              <span className="text-fluid-text-primary">
                {course.northStar.transformationDescription}
              </span>
            </div>
            <div>
              <span className="text-fluid-text-muted">Target Audience: </span>
              <span className="text-fluid-text-primary">
                {course.northStar.targetAudience}
              </span>
            </div>
            <div>
              <span className="text-fluid-text-muted">Prerequisites: </span>
              <span className="text-fluid-text-primary">
                {course.northStar.prerequisites}
              </span>
            </div>
            <div>
              <span className="text-fluid-text-muted">Gap & Friction: </span>
              <span className="text-fluid-text-primary">
                {course.northStar.gapAndFriction}
              </span>
            </div>
            <div className="pt-2 border-t border-[rgba(255,255,255,0.03)]">
              <span className="text-fluid-text-muted">Capstone: </span>
              <span className="text-fluid-text-primary font-medium">
                {course.northStar.capstoneProject.title}
              </span>
              <p className="text-fluid-text-muted text-xs mt-1">
                {course.northStar.capstoneProject.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <CourseMetadataForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  )
}

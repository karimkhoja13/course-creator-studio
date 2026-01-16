import { useState } from 'react'
import { Icons } from '../icons/Icons'
import { useCourseStore } from '../../store/courseStore'
import { CourseMetadataForm } from './CourseMetadataForm'

export function CourseMetadataPanel() {
  const course = useCourseStore((state) => state?.course)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Safety check - if course is undefined, don't render
  if (!course) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Course Title & Description */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-fluid-text-primary mb-3">
              {course.title}
            </h2>
            <p className="text-fluid-text-muted">{course.description}</p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(45,212,191,0.1)] text-fluid-cyan hover:bg-[rgba(45,212,191,0.15)] transition-colors flex-shrink-0"
          >
            <Icons.Edit />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      </div>

      {/* Repository */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-4">
          Repository
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Icons.Code className="text-fluid-cyan" />
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
          <div className="flex items-start gap-2">
            <Icons.Settings className="text-fluid-text-muted mt-0.5" />
            <div>
              <span className="text-fluid-text-muted">Dev Container: </span>
              <span className="text-fluid-text-primary">
                {course.repository.devContainerConfigUrl}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Speakers */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-4">
          Speakers
        </div>
        <div className="flex flex-wrap gap-2">
          {course.speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
            >
              <span className="font-medium text-fluid-text-primary">
                {speaker.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* North Star */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="text-xs text-fluid-text-muted uppercase tracking-wider mb-4">
          North Star
        </div>
        <div className="space-y-4 text-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-fluid-text-muted mb-1">Transformation</div>
              <div className="text-fluid-text-primary">
                {course.northStar.transformationDescription}
              </div>
            </div>
            <div>
              <div className="text-fluid-text-muted mb-1">Target Audience</div>
              <div className="text-fluid-text-primary">
                {course.northStar.targetAudience}
              </div>
            </div>
            <div>
              <div className="text-fluid-text-muted mb-1">Prerequisites</div>
              <div className="text-fluid-text-primary">
                {course.northStar.prerequisites}
              </div>
            </div>
            <div>
              <div className="text-fluid-text-muted mb-1">Gap & Friction</div>
              <div className="text-fluid-text-primary">
                {course.northStar.gapAndFriction}
              </div>
            </div>
          </div>

          {/* Capstone Project */}
          <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2 text-fluid-text-muted mb-2">
              <Icons.Target />
              <span>Capstone Project</span>
            </div>
            <div className="text-fluid-text-primary font-medium">
              {course.northStar.capstoneProject.title}
            </div>
            <p className="text-fluid-text-muted text-xs mt-1">
              {course.northStar.capstoneProject.description}
            </p>
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

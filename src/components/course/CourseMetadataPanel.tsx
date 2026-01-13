import { useState } from 'react'
import { Icons } from '../icons/Icons'
import { useCourseStore } from '../../store/courseStore'

export function CourseMetadataPanel() {
  const course = useCourseStore((state) => state.course)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <div className="px-6 py-3">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-sm text-fluid-text-muted hover:text-fluid-text-primary transition-colors"
        >
          <Icons.ChevronRight />
          <span>Course Metadata</span>
        </button>
      </div>
    )
  }

  return (
    <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
      <button
        onClick={() => setIsExpanded(false)}
        className="flex items-center gap-2 text-sm text-fluid-text-muted hover:text-fluid-text-primary transition-colors mb-4"
      >
        <Icons.ChevronDown />
        <span>Course Metadata</span>
      </button>

      <div className="space-y-4">
        {/* Course Title */}
        <div>
          <h2 className="text-xl font-semibold text-fluid-text-primary mb-2">
            {course.title}
          </h2>
          <p className="text-sm text-fluid-text-muted">{course.description}</p>
        </div>

        {/* Repository */}
        <div className="flex items-center gap-2 text-sm">
          <Icons.Code />
          <a
            href={course.repository.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fluid-cyan hover:underline"
          >
            {course.repository.repoUrl}
          </a>
          <span className="text-fluid-text-muted">({course.repository.branch})</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

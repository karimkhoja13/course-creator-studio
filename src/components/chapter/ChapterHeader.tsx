import { useState } from 'react'
import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { Badge } from '../shared/Badge'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { ChapterForm } from './ChapterForm'
import type { Chapter } from '../../types/course'
import { useCourseStore } from '../../store/courseStore'

interface ChapterHeaderProps {
  chapter: Chapter
  isExpanded: boolean
  onToggle: () => void
}

export function ChapterHeader({
  chapter,
  isExpanded,
  onToggle,
}: ChapterHeaderProps) {
  const deleteChapter = useCourseStore((state) => state.deleteChapter)
  const updateChapter = useCourseStore((state) => state.updateChapter)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(chapter.title)

  const handleDelete = () => {
    deleteChapter(chapter.id)
    setShowDeleteConfirm(false)
  }

  const handleTitleSave = () => {
    if (titleValue.trim() && titleValue !== chapter.title) {
      updateChapter(chapter.id, { title: titleValue.trim() })
    } else {
      setTitleValue(chapter.title)
    }
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave()
    } else if (e.key === 'Escape') {
      setTitleValue(chapter.title)
      setIsEditingTitle(false)
    }
  }

  const totalUnits = chapter.units.length
  const totalAssessments = chapter.fluidDefense.length

  return (
    <>
      <div className="px-2 py-2 flex items-center gap-2">
        <button onClick={onToggle} className="text-fluid-text-muted scale-90">
          {isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
        </button>

        <Badge variant="primary">CHAPTER {chapter.sequenceOrder}</Badge>
        <Badge variant="secondary">DRAFT</Badge>

        <div className="flex-1">
          {isEditingTitle ? (
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="w-full text-base font-semibold text-fluid-text-primary bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded border border-fluid-cyan focus:outline-none focus:border-fluid-cyan"
            />
          ) : (
            <h3
              className="text-base font-semibold text-fluid-text-primary cursor-pointer hover:text-fluid-cyan transition-colors"
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit title"
            >
              {chapter.title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-fluid-text-muted">
          <span>{totalUnits} units</span>
          <span>•</span>
          <span>{totalAssessments} assessments</span>
        </div>

        <div className="flex items-center gap-0.5 scale-90">
          <IconButton
            icon={<Icons.Edit />}
            onClick={() => setIsEditing(true)}
            variant="primary"
            title="Edit chapter"
          />
          <IconButton
            icon={<Icons.Trash />}
            onClick={() => setShowDeleteConfirm(true)}
            variant="danger"
            title="Delete chapter"
          />
        </div>
      </div>

      {/* Learning Objective */}
      {isExpanded && (
        <div className="px-2 pb-2">
          <div className="flex items-center gap-2 text-fluid-text-muted text-xs">
            <Icons.Target className="scale-90" />
            <span>Objective: {chapter.learningObjective}</span>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <ChapterForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        chapter={chapter}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Chapter"
        message={`Are you sure you want to delete "${chapter.title}"? This will also delete ${totalUnits} units and ${totalAssessments} assessments.`}
        confirmText="Delete"
        isDestructive
      />
    </>
  )
}

import { useState } from 'react'
import type { Chapter } from '../../types/course'
import { useCourseStore } from '../../store/courseStore'
import { UnitList } from '../unit/UnitList'
import { FluidDefenseSection } from '../fluidDefense/FluidDefenseSection'
import { ChapterForm } from './ChapterForm'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { IconButton } from '../shared/IconButton'
import { Badge } from '../shared/Badge'
import { Icons } from '../icons/Icons'

interface ChapterDetailViewProps {
  chapter: Chapter
}

export function ChapterDetailView({ chapter }: ChapterDetailViewProps) {
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
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="primary">CHAPTER {chapter.sequenceOrder}</Badge>
              <Badge variant="secondary">DRAFT</Badge>
              <div className="text-xs text-fluid-text-muted">
                {totalUnits} units • {totalAssessments} assessments
              </div>
            </div>

            {/* Editable Title */}
            {isEditingTitle ? (
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="w-full text-2xl font-semibold text-fluid-text-primary bg-[rgba(255,255,255,0.05)] px-3 py-2 rounded-lg border border-fluid-cyan focus:outline-none"
              />
            ) : (
              <h2
                className="text-2xl font-semibold text-fluid-text-primary cursor-pointer hover:text-fluid-cyan transition-colors"
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit title"
              >
                {chapter.title}
              </h2>
            )}

            {/* Learning Objective */}
            <div className="flex items-start gap-2 mt-4 text-fluid-text-muted">
              <Icons.Target className="mt-0.5 flex-shrink-0" />
              <span>{chapter.learningObjective}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
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
      </div>

      {/* Units Section */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-fluid-text-primary uppercase tracking-wider">
            Units
          </span>
          <span className="text-xs text-fluid-text-muted">
            ({totalUnits})
          </span>
        </div>
        <UnitList chapterId={chapter.id} units={chapter.units} />
      </div>

      {/* Assessments Section */}
      <div className="rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-fluid-text-primary uppercase tracking-wider">
            Assessments
          </span>
          <span className="text-xs text-fluid-text-muted">
            ({totalAssessments})
          </span>
        </div>
        <FluidDefenseSection
          chapterId={chapter.id}
          fluidDefense={chapter.fluidDefense}
        />
      </div>

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
    </div>
  )
}

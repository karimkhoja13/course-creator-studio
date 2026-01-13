import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { useCourseStore } from '../../store/courseStore'
import { useTemporalStore } from '../../store/useTemporalStore'

export function CourseHeader() {
  const course = useCourseStore((state) => state?.course)
  const { undo, redo, canUndo, canRedo } = useTemporalStore()

  // Safety check - if course is undefined, don't render
  if (!course) {
    return null
  }

  // Calculate total duration (placeholder - would need to be calculated from actual data)
  const totalDuration = '12m 30s'

  return (
    <div className="h-12 flex items-center gap-4 px-6 border-b border-[rgba(255,255,255,0.05)]">
      <span className="font-medium">Course Canvas</span>
      <span className="text-fluid-text-muted text-sm">
        {course.chapters.length} Chapters
      </span>
      <span className="text-fluid-text-muted text-sm">
        Total Duration: {totalDuration}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <IconButton
          icon={<Icons.Undo />}
          onClick={undo}
          title={canUndo ? "Undo (Ctrl+Z)" : "Nothing to undo"}
          disabled={!canUndo}
        />
        <IconButton
          icon={<Icons.Redo />}
          onClick={redo}
          title={canRedo ? "Redo (Ctrl+Shift+Z)" : "Nothing to redo"}
          disabled={!canRedo}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto px-3 py-1.5 rounded-full bg-[rgba(45,212,191,0.1)] text-fluid-cyan text-sm">
        <Icons.Save />
        Auto-saved
      </div>
    </div>
  )
}

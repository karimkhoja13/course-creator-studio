import { Icons } from '../icons/Icons'
import { IconButton } from '../shared/IconButton'
import { useCourseStore } from '../../store/courseStore'

export function CourseHeader() {
  const course = useCourseStore((state) => state.course)

  // Undo/redo functionality requires zundo package configuration
  const handleUndo = () => {
    console.log('Undo - not yet implemented')
  }

  const handleRedo = () => {
    console.log('Redo - not yet implemented')
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
          onClick={handleUndo}
          title="Undo (not yet implemented)"
          disabled={true}
        />
        <IconButton
          icon={<Icons.Redo />}
          onClick={handleRedo}
          title="Redo (not yet implemented)"
          disabled={true}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto px-3 py-1.5 rounded-full bg-[rgba(45,212,191,0.1)] text-fluid-cyan text-sm">
        <Icons.Save />
        Auto-saved
      </div>
    </div>
  )
}

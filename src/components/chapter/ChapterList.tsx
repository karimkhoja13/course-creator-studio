import { useState } from 'react'
import { useCourseStore } from '../../store/courseStore'
import { ChapterItem } from './ChapterItem'
import { ChapterForm } from './ChapterForm'
import { Icons } from '../icons/Icons'

export function ChapterList() {
  const chapters = useCourseStore((state) => state.course.chapters)
  const [isAddingChapter, setIsAddingChapter] = useState(false)

  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <ChapterItem key={chapter.id} chapter={chapter} index={index} />
      ))}

      {/* Add Chapter Button */}
      <button
        onClick={() => setIsAddingChapter(true)}
        className="w-full py-3 border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-lg text-fluid-text-muted hover:border-[rgba(255,255,255,0.2)] hover:text-fluid-text-primary transition-all flex items-center justify-center gap-2"
      >
        <Icons.Plus />
        Add Chapter
      </button>

      {/* Add Chapter Modal */}
      <ChapterForm
        isOpen={isAddingChapter}
        onClose={() => setIsAddingChapter(false)}
      />
    </div>
  )
}

import { CourseHeader } from './CourseHeader'
import { CourseMetadataPanel } from './CourseMetadataPanel'
import { ViewSelector } from './ViewSelector'
import { ChapterDetailView } from '../chapter/ChapterDetailView'
import { useCourseStore } from '../../store/courseStore'

export function CourseCanvas() {
  const course = useCourseStore((state) => state.course)
  const selectedView = useCourseStore((state) => state.selectedView)

  // Find the selected chapter if viewing a chapter
  const selectedChapter =
    selectedView !== 'overview'
      ? course.chapters.find((c) => c.id === selectedView.chapterId)
      : null

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <CourseHeader />
      <div className="flex-1 overflow-y-auto smooth-scroll-container">
        {/* View Selector Dropdown */}
        <div className="p-6 pb-0">
          <ViewSelector />
        </div>

        {/* Content Area - Conditional Rendering */}
        <div className="p-6">
          {selectedView === 'overview' ? (
            <CourseMetadataPanel />
          ) : selectedChapter ? (
            <ChapterDetailView chapter={selectedChapter} />
          ) : (
            // Fallback if chapter not found (shouldn't happen but be safe)
            <CourseMetadataPanel />
          )}
        </div>
      </div>
    </main>
  )
}

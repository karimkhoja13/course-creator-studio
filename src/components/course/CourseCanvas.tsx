import { CourseHeader } from './CourseHeader'
import { CourseMetadataPanel } from './CourseMetadataPanel'
import { ChapterList } from '../chapter/ChapterList'

export function CourseCanvas() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <CourseHeader />
      <div className="flex-1 overflow-y-auto smooth-scroll-container">
        <CourseMetadataPanel />
        <div className="p-6">
          <ChapterList />
        </div>
      </div>
    </main>
  )
}

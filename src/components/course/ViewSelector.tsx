import { useState, useRef, useEffect } from 'react'
import { useCourseStore } from '../../store/courseStore'
import type { SelectedView } from '../../store/courseStore'
import { Icons } from '../icons/Icons'
import { ChapterForm } from '../chapter/ChapterForm'

/**
 * DROPDOWN STYLE SELECTOR
 * ========================
 * Switch between two dropdown variations anytime by changing this value:
 *
 * - 'enhanced': Minimal change with subtle "View:" label, brighter chevron, improved hover states
 * - 'conventional': Traditional dropdown look with "NAVIGATE" label, stronger background, inset shadow
 *
 * Just change the value below and save - hot reload will show the new style instantly!
 */
const DROPDOWN_STYLE: 'enhanced' | 'conventional' = 'enhanced'

export function ViewSelector() {
  const course = useCourseStore((state) => state.course)
  const selectedView = useCourseStore((state) => state.selectedView)
  const setSelectedView = useCourseStore((state) => state.setSelectedView)

  const [isOpen, setIsOpen] = useState(false)
  const [isAddingChapter, setIsAddingChapter] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Get current selection label
  const getCurrentLabel = () => {
    if (selectedView === 'overview') {
      return 'Course Overview'
    }
    const chapter = course.chapters.find(
      (c) => c.id === selectedView.chapterId
    )
    return chapter ? `${chapter.sequenceOrder}. ${chapter.title}` : 'Course Overview'
  }

  const handleSelect = (view: SelectedView) => {
    setSelectedView(view)
    setIsOpen(false)
  }

  const handleAddChapter = () => {
    setIsOpen(false)
    setIsAddingChapter(true)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      {DROPDOWN_STYLE === 'conventional' ? (
        /* VARIATION 1: Enhanced Indicators - Minimal change with brighter chevron and subtle label */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-fluid-text-muted">
              View:
            </span>
            {selectedView === 'overview' ? (
              <Icons.BookOpen className="text-fluid-cyan" />
            ) : (
              <Icons.Folder className="text-fluid-cyan" />
            )}
            <span className="text-fluid-text-primary font-medium">
              {getCurrentLabel()}
            </span>
          </div>
          <Icons.ChevronDown
            className={`w-5 h-5 transition-all ${
              isOpen
                ? 'rotate-180 text-fluid-cyan'
                : 'text-fluid-text-primary group-hover:text-fluid-cyan'
            }`}
          />
        </button>
      ) : (
        /* VARIATION 2: Conventional Dropdown - Traditional select appearance with stronger visual cues */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.18)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] transition-all cursor-pointer"
        >
          <div className="flex flex-col items-start gap-1 flex-1">
            <span className="text-[10px] uppercase tracking-wider text-fluid-text-muted font-semibold">
              Navigate
            </span>
            <div className="flex items-center gap-2">
              {selectedView === 'overview' ? (
                <Icons.BookOpen className="text-fluid-cyan w-4 h-4" />
              ) : (
                <Icons.Folder className="text-fluid-cyan w-4 h-4" />
              )}
              <span className="text-fluid-text-primary font-medium">
                {getCurrentLabel()}
              </span>
            </div>
          </div>
          <Icons.ChevronDown
            className={`w-5 h-5 flex-shrink-0 transition-all ${
              isOpen ? 'rotate-180 text-fluid-cyan' : 'text-fluid-text-primary'
            }`}
          />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-[rgba(30,30,35,0.98)] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 backdrop-blur-sm">
          {/* Course Overview Option */}
          <button
            onClick={() => handleSelect('overview')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
              selectedView === 'overview'
                ? 'bg-[rgba(45,212,191,0.1)] text-fluid-cyan'
                : 'text-fluid-text-primary hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            <Icons.BookOpen />
            <span>Course Overview</span>
            {selectedView === 'overview' && (
              <Icons.Check className="ml-auto" />
            )}
          </button>

          {/* Separator */}
          {course.chapters.length > 0 && (
            <div className="my-2 mx-4 border-t border-[rgba(255,255,255,0.08)]" />
          )}

          {/* Chapter Options */}
          {course.chapters.map((chapter) => {
            const isSelected =
              selectedView !== 'overview' &&
              selectedView.chapterId === chapter.id

            return (
              <button
                key={chapter.id}
                onClick={() =>
                  handleSelect({ type: 'chapter', chapterId: chapter.id })
                }
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  isSelected
                    ? 'bg-[rgba(45,212,191,0.1)] text-fluid-cyan'
                    : 'text-fluid-text-primary hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <Icons.Folder />
                <div className="flex-1 min-w-0">
                  <span className="block truncate">
                    {chapter.sequenceOrder}. {chapter.title}
                  </span>
                  <span className="text-xs text-fluid-text-muted">
                    {chapter.units.length} units • {chapter.fluidDefense.length}{' '}
                    assessments
                  </span>
                </div>
                {isSelected && <Icons.Check className="flex-shrink-0" />}
              </button>
            )
          })}

          {/* Separator before Add Chapter */}
          <div className="my-2 mx-4 border-t border-[rgba(255,255,255,0.08)]" />

          {/* Add Chapter Action */}
          <button
            onClick={handleAddChapter}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-fluid-text-muted hover:text-fluid-cyan hover:bg-[rgba(45,212,191,0.05)] transition-colors"
          >
            <Icons.Plus />
            <span>Add Chapter</span>
          </button>
        </div>
      )}

      {/* Add Chapter Modal */}
      <ChapterForm
        isOpen={isAddingChapter}
        onClose={() => setIsAddingChapter(false)}
      />
    </div>
  )
}

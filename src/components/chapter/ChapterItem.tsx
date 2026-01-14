import { useState } from 'react'
import type { Chapter } from '../../types/course'
import { ChapterHeader } from './ChapterHeader'
import { UnitList } from '../unit/UnitList'
import { FluidDefenseSection } from '../fluidDefense/FluidDefenseSection'

interface ChapterItemProps {
  chapter: Chapter
  index: number
}

export function ChapterItem({ chapter, index }: ChapterItemProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0)

  return (
    <div
      className={`rounded-xl bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden ${
        isExpanded ? '' : 'hover:bg-[rgba(255,255,255,0.03)]'
      } transition-colors`}
    >
        <ChapterHeader
          chapter={chapter}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />

        {isExpanded && (
          <>
            {/* Units */}
            <div className="px-4 py-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
                <span className="text-xs text-fluid-text-muted uppercase tracking-widest">
                  Units
                </span>
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
              </div>
              <UnitList chapterId={chapter.id} units={chapter.units} />
            </div>

            {/* FluidDefense (Assessments) */}
            <div className="px-4 py-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
                <span className="text-xs text-fluid-text-muted uppercase tracking-widest">
                  Assessments
                </span>
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
              </div>
              <FluidDefenseSection
                chapterId={chapter.id}
                fluidDefense={chapter.fluidDefense}
              />
            </div>
          </>
        )}
    </div>
  )
}

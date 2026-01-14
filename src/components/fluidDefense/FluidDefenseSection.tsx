import { useState } from 'react'
import type { FluidDefense } from '../../types/course'
import { FluidDefenseItem } from './FluidDefenseItem'
import { FluidDefenseForm } from './FluidDefenseForm'
import { Icons } from '../icons/Icons'

interface FluidDefenseSectionProps {
  chapterId: number
  fluidDefense: FluidDefense[]
}

export function FluidDefenseSection({
  chapterId,
  fluidDefense,
}: FluidDefenseSectionProps) {
  const [isAddingDefense, setIsAddingDefense] = useState(false)

  return (
    <div className="space-y-3">
      {fluidDefense.map((defense) => (
        <FluidDefenseItem
          key={defense.id}
          chapterId={chapterId}
          defense={defense}
        />
      ))}

      {/* Add Assessment Button */}
      <button
        onClick={() => setIsAddingDefense(true)}
        className="w-full py-2.5 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-lg text-fluid-text-muted hover:border-[rgba(255,255,255,0.15)] hover:text-fluid-text-primary transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Icons.Plus />
        Add Assessment
      </button>

      {/* Add Assessment Modal */}
      <FluidDefenseForm
        isOpen={isAddingDefense}
        onClose={() => setIsAddingDefense(false)}
        chapterId={chapterId}
      />
    </div>
  )
}

import { useState } from 'react'
import type { Unit } from '../../types/course'
import { UnitItem } from './UnitItem'
import { UnitForm } from './UnitForm'
import { Icons } from '../icons/Icons'

interface UnitListProps {
  chapterId: number
  units: Unit[]
}

export function UnitList({ chapterId, units }: UnitListProps) {
  const [isAddingUnit, setIsAddingUnit] = useState(false)

  return (
    <div className="space-y-4">
      {units.map((unit) => (
        <UnitItem key={unit.id} chapterId={chapterId} unit={unit} />
      ))}

      {/* Add Unit Button */}
      <button
        onClick={() => setIsAddingUnit(true)}
        className="w-full py-2.5 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-lg text-fluid-text-muted hover:border-[rgba(255,255,255,0.15)] hover:text-fluid-text-primary transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Icons.Plus />
        Add Unit
      </button>

      {/* Add Unit Modal */}
      <UnitForm
        isOpen={isAddingUnit}
        onClose={() => setIsAddingUnit(false)}
        chapterId={chapterId}
      />
    </div>
  )
}

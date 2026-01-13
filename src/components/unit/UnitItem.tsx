import type { Unit } from '../../types/course'
import { UnitHeader } from './UnitHeader'
import { DirectiveDisplay } from './DirectiveDisplay'
import { AttachmentList } from '../attachment/AttachmentList'

interface UnitItemProps {
  chapterId: number
  unit: Unit
}

export function UnitItem({ chapterId, unit }: UnitItemProps) {
  return (
    <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
      <UnitHeader chapterId={chapterId} unit={unit} />
      <DirectiveDisplay directive={unit.directive} />

      {/* Attachments */}
      {unit.attachments.length > 0 && (
        <div className="mt-4">
          <AttachmentList
            chapterId={chapterId}
            unitId={unit.id}
            attachments={unit.attachments}
          />
        </div>
      )}
    </div>
  )
}

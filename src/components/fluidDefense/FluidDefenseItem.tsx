import type { FluidDefense } from '../../types/course'
import {
  isMCQFluidDefense,
  isCodingChallengeFluidDefense,
  isOpenQuestionFluidDefense,
} from '../../types/course'
import { MCQDisplay } from './MCQDisplay'
import { CodingChallengeDisplay } from './CodingChallengeDisplay'
import { OpenQuestionDisplay } from './OpenQuestionDisplay'

interface FluidDefenseItemProps {
  chapterId: number
  defense: FluidDefense
}

export function FluidDefenseItem({ chapterId, defense }: FluidDefenseItemProps) {
  if (isMCQFluidDefense(defense)) {
    return <MCQDisplay chapterId={chapterId} defense={defense} />
  }

  if (isCodingChallengeFluidDefense(defense)) {
    return (
      <CodingChallengeDisplay chapterId={chapterId} defense={defense} />
    )
  }

  if (isOpenQuestionFluidDefense(defense)) {
    return <OpenQuestionDisplay chapterId={chapterId} defense={defense} />
  }

  return null
}

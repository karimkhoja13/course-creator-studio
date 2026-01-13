import type {
  Attachment,
  Chapter,
  CourseManifest,
  FluidDefense,
  Unit,
} from '../types/course'

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

/**
 * Validate chapter data
 */
export function validateChapter(
  chapter: Partial<Chapter>,
  course?: CourseManifest,
  currentChapterId?: number
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!chapter.title || chapter.title.trim() === '') {
    errors.title = 'Title is required'
  }

  if (!chapter.learningObjective || chapter.learningObjective.trim() === '') {
    errors.learningObjective = 'Learning objective is required'
  }

  if (chapter.sequenceOrder !== undefined && course) {
    const isDuplicate = course.chapters.some(
      (ch) =>
        ch.sequenceOrder === chapter.sequenceOrder &&
        ch.id !== currentChapterId
    )
    if (isDuplicate) {
      errors.sequenceOrder = 'Sequence order must be unique'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate unit data
 */
export function validateUnit(unit: Partial<Unit>): ValidationResult {
  const errors: Record<string, string> = {}

  if (!unit.title || unit.title.trim() === '') {
    errors.title = 'Title is required'
  }

  if (!unit.directive || unit.directive.trim() === '') {
    errors.directive = 'Directive is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate attachment data
 */
export function validateAttachment(
  attachment: Partial<Attachment>
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!attachment.type) {
    errors.type = 'Attachment type is required'
  }

  if (!attachment.note || attachment.note.trim() === '') {
    errors.note = 'Note is required'
  }

  if (
    attachment.type === 'CODE_REF' &&
    (!('filePath' in attachment) ||
      !(attachment as any).filePath ||
      (attachment as any).filePath.trim() === '')
  ) {
    errors.filePath = 'File path is required for CODE_REF'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate MCQ FluidDefense
 */
export function validateMCQ(
  mcq: Partial<FluidDefense>
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!mcq.question || mcq.question.trim() === '') {
    errors.question = 'Question is required'
  }

  const options = (mcq as any).options
  if (!options || !Array.isArray(options) || options.length < 2) {
    errors.options = 'At least 2 options are required'
  }

  const correctOptionIndex = (mcq as any).correctOptionIndex
  if (
    correctOptionIndex === undefined ||
    correctOptionIndex < 0 ||
    (options && correctOptionIndex >= options.length)
  ) {
    errors.correctOptionIndex = 'Invalid correct option index'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate Coding Challenge FluidDefense
 */
export function validateCodingChallenge(
  challenge: Partial<FluidDefense>
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!challenge.question || challenge.question.trim() === '') {
    errors.question = 'Question is required'
  }

  if (
    !('startState' in challenge) ||
    !(challenge as any).startState ||
    (challenge as any).startState.trim() === ''
  ) {
    errors.startState = 'Start state is required'
  }

  if (
    !('solutionState' in challenge) ||
    !(challenge as any).solutionState ||
    (challenge as any).solutionState.trim() === ''
  ) {
    errors.solutionState = 'Solution state is required'
  }

  if (
    !('successCriteria' in challenge) ||
    !(challenge as any).successCriteria ||
    (challenge as any).successCriteria.trim() === ''
  ) {
    errors.successCriteria = 'Success criteria is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate Open Question FluidDefense
 */
export function validateOpenQuestion(
  question: Partial<FluidDefense>
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!question.question || question.question.trim() === '') {
    errors.question = 'Question is required'
  }

  const evaluationCriteria = (question as any).evaluationCriteria
  if (
    !evaluationCriteria ||
    !Array.isArray(evaluationCriteria) ||
    evaluationCriteria.length === 0
  ) {
    errors.evaluationCriteria = 'At least one evaluation criterion is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate FluidDefense based on type
 */
export function validateFluidDefense(
  defense: Partial<FluidDefense>
): ValidationResult {
  if (!defense.type) {
    return {
      isValid: false,
      errors: { type: 'FluidDefense type is required' },
    }
  }

  switch (defense.type) {
    case 'MCQ':
      return validateMCQ(defense)
    case 'CODING_CHALLENGE':
      return validateCodingChallenge(defense)
    case 'OPEN_QUESTION':
      return validateOpenQuestion(defense)
    default:
      return {
        isValid: false,
        errors: { type: 'Invalid FluidDefense type' },
      }
  }
}

// Type definitions for CourseManifest
// Mirrors the structure from @fluidcast/contract/player

export interface Repository {
  repoUrl: string
  branch: string
  devContainerConfigUrl: string
}

export interface Speaker {
  id: number
  name: string
  personality: string
}

export interface CapstoneProject {
  title: string
  description: string
}

export interface NorthStar {
  transformationDescription: string
  targetAudience: string
  prerequisites: string
  gapAndFriction: string
  capstoneProject: CapstoneProject
}

export interface RealizationPoint {
  concept: string
  suggestedApproach: string
  hints: string[]
}

// Discriminated union for Attachment types
export type AttachmentType = 'CODE_REF' | 'DOC_REF'

export interface BaseAttachment {
  type: AttachmentType
  id: number
  note: string
}

export interface CodeRefAttachment extends BaseAttachment {
  type: 'CODE_REF'
  filePath: string
  commitHash?: string
}

export interface DocRefAttachment extends BaseAttachment {
  type: 'DOC_REF'
}

export type Attachment = CodeRefAttachment | DocRefAttachment

// Discriminated union for FluidDefense types
export type FluidDefenseType = 'MCQ' | 'CODING_CHALLENGE' | 'OPEN_QUESTION'

export interface BaseFluidDefense {
  id: number
  type: FluidDefenseType
  question: string
  progressiveHints?: string[]
}

export interface MCQFluidDefense extends BaseFluidDefense {
  type: 'MCQ'
  options: string[]
  correctOptionIndex: number
  followUpQuestion?: string
}

export interface CodingChallengeFluidDefense extends BaseFluidDefense {
  type: 'CODING_CHALLENGE'
  startState: string
  solutionState: string
  successCriteria: string
}

export interface OpenQuestionFluidDefense extends BaseFluidDefense {
  type: 'OPEN_QUESTION'
  evaluationCriteria: string[]
}

export type FluidDefense =
  | MCQFluidDefense
  | CodingChallengeFluidDefense
  | OpenQuestionFluidDefense

export interface Unit {
  id: number
  title: string
  directive: string
  realizationPoints: RealizationPoint[]
  attachments: Attachment[]
  endCodeState: string
}

export interface Chapter {
  id: number
  title: string
  sequenceOrder: number
  learningObjective: string
  endCodeState: string
  units: Unit[]
  fluidDefense: FluidDefense[]
}

export interface CourseManifest {
  id: number
  title: string
  description: string
  repository: Repository
  initialCodeState: string
  speakers: Speaker[]
  northStar: NorthStar
  chapters: Chapter[]
}

// Type guards for discriminated unions
export function isCodeRefAttachment(
  attachment: Attachment
): attachment is CodeRefAttachment {
  return attachment.type === 'CODE_REF'
}

export function isDocRefAttachment(
  attachment: Attachment
): attachment is DocRefAttachment {
  return attachment.type === 'DOC_REF'
}

export function isMCQFluidDefense(
  defense: FluidDefense
): defense is MCQFluidDefense {
  return defense.type === 'MCQ'
}

export function isCodingChallengeFluidDefense(
  defense: FluidDefense
): defense is CodingChallengeFluidDefense {
  return defense.type === 'CODING_CHALLENGE'
}

export function isOpenQuestionFluidDefense(
  defense: FluidDefense
): defense is OpenQuestionFluidDefense {
  return defense.type === 'OPEN_QUESTION'
}

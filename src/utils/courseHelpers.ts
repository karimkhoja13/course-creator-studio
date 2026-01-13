import type {
  Attachment,
  Chapter,
  CourseManifest,
  FluidDefense,
  Unit,
} from '../types/course'

/**
 * Find a chapter by ID
 */
export function findChapterById(
  course: CourseManifest,
  chapterId: number
): Chapter | undefined {
  return course.chapters.find((chapter) => chapter.id === chapterId)
}

/**
 * Find a unit by ID within a chapter
 */
export function findUnitById(
  chapter: Chapter,
  unitId: number
): Unit | undefined {
  return chapter.units.find((unit) => unit.id === unitId)
}

/**
 * Find an attachment by ID within a unit
 */
export function findAttachmentById(
  unit: Unit,
  attachmentId: number
): Attachment | undefined {
  return unit.attachments.find((attachment) => attachment.id === attachmentId)
}

/**
 * Find a FluidDefense item by ID within a chapter
 */
export function findFluidDefenseById(
  chapter: Chapter,
  defenseId: number
): FluidDefense | undefined {
  return chapter.fluidDefense.find((defense) => defense.id === defenseId)
}

/**
 * Generic helper to update a nested item in an array
 */
export function updateNestedItem<T extends { id: number }>(
  items: T[],
  id: number,
  updater: (item: T) => T
): T[] {
  return items.map((item) => (item.id === id ? updater(item) : item))
}

/**
 * Generic helper to delete a nested item from an array
 */
export function deleteNestedItem<T extends { id: number }>(
  items: T[],
  id: number
): T[] {
  return items.filter((item) => item.id !== id)
}

/**
 * Count total units in a course
 */
export function countUnits(course: CourseManifest): number {
  return course.chapters.reduce((sum, chapter) => sum + chapter.units.length, 0)
}

/**
 * Count total assessments (FluidDefense items) in a course
 */
export function countAssessments(course: CourseManifest): number {
  return course.chapters.reduce(
    (sum, chapter) => sum + chapter.fluidDefense.length,
    0
  )
}

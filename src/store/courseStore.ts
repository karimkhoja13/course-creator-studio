import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type {
  Attachment,
  Chapter,
  CourseManifest,
  FluidDefense,
  Unit,
} from '../types/course'
import { course as initialCourse } from '../data/course'
import { generateId } from '../utils/idGenerator'
import {
  deleteNestedItem,
  updateNestedItem,
} from '../utils/courseHelpers'

/**
 * History entry for undo/redo
 */
interface HistoryEntry {
  course: CourseManifest
}

/**
 * Course store state interface
 */
export interface CourseState {
  course: CourseManifest
  selectedChapterId: number | null
  selectedUnitId: number | null

  // Undo/Redo history
  past: HistoryEntry[]
  future: HistoryEntry[]

  // Chapter actions
  addChapter: (chapter: Omit<Chapter, 'id' | 'units' | 'fluidDefense'>) => void
  updateChapter: (
    chapterId: number,
    updates: Partial<Omit<Chapter, 'id' | 'units' | 'fluidDefense'>>
  ) => void
  deleteChapter: (chapterId: number) => void

  // Unit actions
  addUnit: (
    chapterId: number,
    unit: Omit<Unit, 'id' | 'attachments'>
  ) => void
  updateUnit: (
    chapterId: number,
    unitId: number,
    updates: Partial<Omit<Unit, 'id' | 'attachments'>>
  ) => void
  deleteUnit: (chapterId: number, unitId: number) => void

  // Attachment actions
  addAttachment: (
    chapterId: number,
    unitId: number,
    attachment: Omit<Attachment, 'id'>
  ) => void
  updateAttachment: (
    chapterId: number,
    unitId: number,
    attachmentId: number,
    updates: Partial<Omit<Attachment, 'id'>>
  ) => void
  deleteAttachment: (
    chapterId: number,
    unitId: number,
    attachmentId: number
  ) => void

  // FluidDefense actions
  addFluidDefense: (
    chapterId: number,
    defense: Omit<FluidDefense, 'id'>
  ) => void
  updateFluidDefense: (
    chapterId: number,
    defenseId: number,
    updates: Partial<Omit<FluidDefense, 'id'>>
  ) => void
  deleteFluidDefense: (chapterId: number, defenseId: number) => void

  // Selection actions
  setSelectedChapter: (chapterId: number | null) => void
  setSelectedUnit: (unitId: number | null) => void

  // Course metadata actions
  updateCourseMetadata: (
    updates: Partial<
      Omit<CourseManifest, 'id' | 'chapters' | 'speakers' | 'northStar'>
    >
  ) => void

  // Undo/Redo actions
  undo: () => void
  redo: () => void
  clearHistory: () => void
}

/**
 * Helper to save current state to history before making a change
 */
const saveToHistory = (get: () => CourseState): Partial<CourseState> => {
  const currentCourse = get().course
  const past = get().past

  return {
    past: [...past.slice(-49), { course: currentCourse }], // Keep last 50 states
    future: [], // Clear future when making a new change
  }
}

/**
 * Create the course store with custom undo/redo
 */
export const useCourseStore = create<CourseState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      course: initialCourse,
      selectedChapterId: null,
      selectedUnitId: null,
      past: [],
      future: [],

      // Chapter actions
      addChapter: (chapter) =>
        set((state) => ({
          ...saveToHistory(get),
          course: {
            ...state.course,
            chapters: [
              ...state.course.chapters,
              {
                ...chapter,
                id: generateId(),
                units: [],
                fluidDefense: [],
              },
            ],
          },
        })),

      updateChapter: (chapterId, updates) =>
        set((state) => ({
          ...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                ...updates,
              })
            ),
          },
        })),

      deleteChapter: (chapterId) =>
        set((state) => ({
          ...saveToHistory(get),
          course: {
            ...state.course,
            chapters: deleteNestedItem(state.course.chapters, chapterId),
          },
          selectedChapterId:
            state.selectedChapterId === chapterId
              ? null
              : state.selectedChapterId,
        })),

      // Unit actions
      addUnit: (chapterId, unit) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: [
                  ...chapter.units,
                  {
                    ...unit,
                    id: generateId(),
                    attachments: [],
                  },
                ],
              })
            ),
          },
        })),

      updateUnit: (chapterId, unitId, updates) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: updateNestedItem(chapter.units, unitId, (unit) => ({
                  ...unit,
                  ...updates,
                })),
              })
            ),
          },
        })),

      deleteUnit: (chapterId, unitId) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: deleteNestedItem(chapter.units, unitId),
              })
            ),
          },
          selectedUnitId:
            state.selectedUnitId === unitId ? null : state.selectedUnitId,
        })),

      // Attachment actions
      addAttachment: (chapterId, unitId, attachment) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: updateNestedItem(chapter.units, unitId, (unit) => ({
                  ...unit,
                  attachments: [
                    ...unit.attachments,
                    {
                      ...attachment,
                      id: generateId(),
                    } as Attachment,
                  ],
                })),
              })
            ),
          },
        })),

      updateAttachment: (chapterId, unitId, attachmentId, updates) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: updateNestedItem(chapter.units, unitId, (unit) => ({
                  ...unit,
                  attachments: updateNestedItem(
                    unit.attachments,
                    attachmentId,
                    (attachment) => ({
                      ...attachment,
                      ...updates,
                    } as Attachment)
                  ),
                })),
              })
            ),
          },
        })),

      deleteAttachment: (chapterId, unitId, attachmentId) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                units: updateNestedItem(chapter.units, unitId, (unit) => ({
                  ...unit,
                  attachments: deleteNestedItem(
                    unit.attachments,
                    attachmentId
                  ),
                })),
              })
            ),
          },
        })),

      // FluidDefense actions
      addFluidDefense: (chapterId, defense) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                fluidDefense: [
                  ...chapter.fluidDefense,
                  {
                    ...defense,
                    id: generateId(),
                  } as FluidDefense,
                ],
              })
            ),
          },
        })),

      updateFluidDefense: (chapterId, defenseId, updates) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                fluidDefense: updateNestedItem(
                  chapter.fluidDefense,
                  defenseId,
                  (defense) => ({
                    ...defense,
                    ...updates,
                  } as FluidDefense)
                ),
              })
            ),
          },
        })),

      deleteFluidDefense: (chapterId, defenseId) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            chapters: updateNestedItem(
              state.course.chapters,
              chapterId,
              (chapter) => ({
                ...chapter,
                fluidDefense: deleteNestedItem(
                  chapter.fluidDefense,
                  defenseId
                ),
              })
            ),
          },
        })),

      // Selection actions
      setSelectedChapter: (chapterId) =>
        set({ selectedChapterId: chapterId }),

      setSelectedUnit: (unitId) => set({ selectedUnitId: unitId }),

      // Course metadata actions
      updateCourseMetadata: (updates) =>
        set((state) => ({...saveToHistory(get),
          course: {
            ...state.course,
            ...updates,
          },
        })),

      // Undo/Redo actions
      undo: () => {
        const { past, future, course } = get()
        if (past.length === 0) return

        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)

        set({
          past: newPast,
          future: [{ course }, ...future],
          course: previous.course,
        })
      },

      redo: () => {
        const { past, future, course } = get()
        if (future.length === 0) return

        const next = future[0]
        const newFuture = future.slice(1)

        set({
          past: [...past, { course }],
          future: newFuture,
          course: next.course,
        })
      },

      clearHistory: () => {
        set({ past: [], future: [] })
      },
    }))
  )
)

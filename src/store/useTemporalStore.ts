import { useCourseStore } from './courseStore'

/**
 * Hook to access undo/redo state and actions from the course store
 * Provides reactive access to undo/redo availability
 */
export const useTemporalStore = () => {
  const canUndo = useCourseStore((state) => state.past.length > 0)
  const canRedo = useCourseStore((state) => state.future.length > 0)
  const undo = useCourseStore((state) => state.undo)
  const redo = useCourseStore((state) => state.redo)
  const clearHistory = useCourseStore((state) => state.clearHistory)

  return {
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
  }
}

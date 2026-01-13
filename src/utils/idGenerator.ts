/**
 * Generates unique numeric IDs for course elements
 * Uses timestamp + random suffix to ensure uniqueness
 */
export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 10000)
}

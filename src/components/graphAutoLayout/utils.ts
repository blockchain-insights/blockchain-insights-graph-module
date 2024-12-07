import { Position } from 'reactflow'

export type LayoutDirection = 'TB' | 'BT' | 'LR' | 'RL'

/**
 * Get the source handle position based on the layout direction.
 * @param direction The direction of the layout ("TB", "BT", "LR", "RL").
 * @returns The `Position` for the source handle.
 */
export function getSourceHandlePosition(direction: LayoutDirection): Position | undefined {
  switch (direction) {
    case 'TB':
      return Position.Bottom
    case 'BT':
      return Position.Top
    case 'LR':
      return Position.Right
    case 'RL':
      return Position.Left
    default:
      return undefined
  }
}

/**
 * Get the target handle position based on the layout direction.
 * @param direction The direction of the layout ("TB", "BT", "LR", "RL").
 * @returns The `Position` for the target handle.
 */
export function getTargetHandlePosition(direction: LayoutDirection): Position | undefined {
  switch (direction) {
    case 'TB':
      return Position.Top
    case 'BT':
      return Position.Bottom
    case 'LR':
      return Position.Left
    case 'RL':
      return Position.Right
    default:
      return undefined
  }
}

/**
 * Generate a unique ID based on the current timestamp.
 * @returns A string representing the unique ID.
 */
export function getId(): string {
  return `${Date.now()}`
}

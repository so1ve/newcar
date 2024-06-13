import { changeProperty } from '@newcar/core'

/**
 * Create animation
 * It makes the progress props of widgets from 0 to 1
 */

// TODO
export function create() {
  return changeProperty(w => w.progress)
    .withAttr({ from: 0, to: 1 })
}

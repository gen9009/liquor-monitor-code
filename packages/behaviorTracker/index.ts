import { IBehaviorOptions } from '../types'
import { pvTracker } from './pv'
import { uvTracker } from './uv'



export const initBehaviorTracker = (options: IBehaviorOptions) => {
  const { enableEvents, enablePV, enableUV, mode } = options
  enablePV && pvTracker(mode)
  enableUV && uvTracker()
}

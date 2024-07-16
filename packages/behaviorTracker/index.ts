import { IBehaviorOptions } from '../types'
import { pvTracker } from './pv'



export const initBehaviorTracker = (options: IBehaviorOptions) => {
  const { enableEvents, enablePV, enableUV, mode } = options
  enablePV && pvTracker(mode)
}

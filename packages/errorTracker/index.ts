import { IErrorTrackerOptions } from '../types'
import { jsErrorTracker } from './jsError'
import { promiseErrorTracker } from './promiseError'
import { resourceErrorTracker } from './resourceError'



export const initErrorTracker = (options: IErrorTrackerOptions) => {
  const { enableJSErrors, enableResourceErrors, enablePromiseErrors } = options
  enableResourceErrors && resourceErrorTracker()


  // enableJSErrors && jsErrorTracker()
  // enablePromiseErrors && promiseErrorTracker()
}

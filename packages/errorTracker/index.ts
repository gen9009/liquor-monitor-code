import { IErrorOptions } from '../types'
import { jsErrorTracker } from './jsError'
import { promiseErrorTracker } from './promiseError'
import { resourceErrorTracker } from './resourceError'



export const initErrorTracker = (options: IErrorOptions) => {
  const { enableJSErrors, enableResourceErrors, enablePromiseErrors } = options
  enableJSErrors && jsErrorTracker()
  enableResourceErrors && resourceErrorTracker()
  enablePromiseErrors && promiseErrorTracker()
}

import { IErrorOptions } from '../types'
import { jsErrorTracker } from './jsError'
import { promiseErrorTracker } from './promiseError'
import { resourceErrorTracker } from './resourceError'
import { xhrErrorTracker } from './xhrError'



export const initErrorTracker = (options: IErrorOptions) => {
  const { enableJSErrors, enableResourceErrors, enablePromiseErrors, enableXhrErrors } = options
  enableJSErrors && jsErrorTracker()
  enableResourceErrors && resourceErrorTracker()
  enablePromiseErrors && promiseErrorTracker()
  enableXhrErrors && xhrErrorTracker()
}

import { IErrorOptions } from '../types'
import { jsErrorTracker } from './jsError'
import { promiseErrorTracker } from './promiseError'
import { resourceErrorTracker } from './resourceError'
import { xhrErrorTracker } from './xhrError'
import { fetchErrorTracker } from './fetchError'



export const initErrorTracker = (options: IErrorOptions) => {
  const { enableJSErrors, enableResourceErrors, enablePromiseErrors, enableXhrErrors, enableFetchErrors } = options
  enableJSErrors && jsErrorTracker()
  enableResourceErrors && resourceErrorTracker()
  enablePromiseErrors && promiseErrorTracker()
  enableXhrErrors && xhrErrorTracker()
  enableFetchErrors && fetchErrorTracker()

}

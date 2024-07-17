import { report } from '../report'
import { PublicErrorInit } from './publicError';
import { PromiseErrorReport } from '../types'
import { ErrorType } from '../shared/enum';
import { isObject, getLines } from '../utils';
// Promise主动catch不会执行unhandledrejection
export const promiseErrorTracker = () => {
  window.addEventListener("unhandledrejection",
    (event) => {
      let promiseError = { ...PublicErrorInit } as PromiseErrorReport
      //   selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后一个操作的元素
      /* 
        三种 reason
        Promise.reject('message') || Promise.reject({error: 'message'})||Promise.reject(new Error('message'))
      */
      let reason = isObject(event.reason) ? event.reason : { message: event.reason }
      let stackResult = Reflect.has(reason, 'stack') ? reason.stack.match(/at\s+(.+):(\d+):(\d+)/) : ''
      if (stackResult.length) {
        let [, filename, lineNo, colNo] = stackResult;
        Object.assign(promiseError, { filename, lineNo, colNo })
      }
      Object.assign(promiseError, {
        errorType: ErrorType['PROMISE_ERROR'],
        stack: getLines(reason.stack || ''),
        errorMessage: reason.message || JSON.stringify(reason),
        selector: ''
      })
      report(promiseError)
    },
    true
  );
}

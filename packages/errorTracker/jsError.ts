import { report } from '../report'
import { PublicErrorInit } from './publicError';
import { JSErrorReport } from '../types'
import { ErrorType } from '../shared/enum';
import { isResource, getLines } from '../utils';
export const jsErrorTracker = () => {
  window.addEventListener("error",
    (event: ErrorEvent) => {
      let jsError = { ...PublicErrorInit } as JSErrorReport
      if (!isResource(event)) {
        Object.assign(jsError, {
          errorType: ErrorType['RESOURCE_ERROR'],
          errorMessage: event.message || '',
          filename: event.filename,
          lineNo: event.lineno,
          colNo: event.colno,
          stack: getLines(event.error.stack),
          selector: ''
        })
      }
      report(jsError)
    },
    true
  );
}


import { report } from '../report'
import { PublicErrorInit } from './publicError';
import { ResourceErrorReport, } from '../types'
import { ErrorType } from '../shared/enum';
import { isResource } from '../utils';
export const resourceErrorTracker = () => {
  window.addEventListener("error",
    (event: ErrorEvent) => {
      let resourceError = { ...PublicErrorInit } as ResourceErrorReport
      if (isResource(event)) {
        Object.assign(resourceError, {
          errorType: ErrorType['RESOURCE_ERROR'],
          errorMessage: event.message || '',
          filename: event.filename,
          tagName: (event.target as HTMLElement).tagName,
          // selector: getSelector(event.target), // 代表最后一个操作的元素
        })
      }
      report(resourceError)
    },
    true
  );
}

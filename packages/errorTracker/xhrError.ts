import { rewriteAttr } from '../shared/helper';

export const xhrErrorTracker = () => {
  rewriteXHR()
}

function rewriteXHR() {
  const originXHR = window.XMLHttpRequest;
  rewriteAttr(originXHR.prototype, 'open', function (originOpen) {
    return function (...args) {
      return originOpen.apply(this, args);
    }
  })
  rewriteAttr(originXHR.prototype, 'send', function (originSend) {
    return function (...args) {
      /* 处理上报 待测试 */
      const errorHandler = function (event) {
        console.log('🚀::::::🐶💩', event)
      }
      this.addListener('loadend', errorHandler)
      return originSend.apply(this, args);
    }
  })
}

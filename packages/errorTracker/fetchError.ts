import { rewriteAttr } from "../shared/helper";
export const fetchErrorTracker = () => {
  rewriteFetch()
}
function rewriteFetch() {
  rewriteAttr(window, 'fetch', function (originalFetch) {
    return function (...args) {
      originalFetch.apply(this, args)
        .then(
          response => {
            const cloneResponse = response.clone()
            cloneResponse.text().then(data => {
              /* 处理上报 待测试 */
              console.log('🚀::::::🐶💩', data)
            })
          },
          (error: Error) => {
            /* 处理上报 待测试 */
            console.log('🚀::::::🐶💩', error)

          })
    }
  })
}

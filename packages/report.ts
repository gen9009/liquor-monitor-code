import { monitorConfig } from './config';

/* 
  上报信息
*/
export function report<T>(data: T) {
  const { url } = window[monitorConfig];
  const params = {}
  Object.assign(params, data, window[monitorConfig])
  // ------- fetch方式上报 -------
  // 跨域问题
  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.error(err);
  // })

  // ------- XML方式上报 -------
  // 跨域问题
  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.send(JSON.stringify(data));


  // ------- navigator/img方式上报 -------
  // 不会有跨域问题
  if (navigator.sendBeacon) { // 支持sendBeacon的浏览器
    navigator.sendBeacon(url, JSON.stringify(params));
    console.log('🚀::::::🐶💩', params, 'navigator')
  } else { // 不支持sendBeacon的浏览器
    // 一般是1*1像素的gif
    let oImage = new Image();
    oImage.src = `${url}?logs=${params}`;
    console.log('🚀::::::🐶💩', params, 'oImage', oImage)
  }
}

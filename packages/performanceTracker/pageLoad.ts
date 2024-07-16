/* 
  监听页面加载情况
*/
export const pageLoad = () => {

}
/* 
  测量浏览器加载 HTML 文档所需的时间
*/
const getNavigationTiming = () => {
  // 获取性能数据
  const [performanceData] = performance.getEntriesByType("navigation");

  // 计算重定向时间
  let redirectTime = performanceData.redirectEnd - performanceData.redirectStart;

  // 计算缓存耗时时间
  let cacheTime = performanceData.domainLookupStart - performanceData.fetchStart;

  // 计算DNS查询时间
  let dnsLookupTime = performanceData.domainLookupEnd - performanceData.domainLookupStart;

  // 计算TCP连接时间
  let tcpConnectTime = performanceData.connectEnd - performanceData.connectStart;

  // 计算SSL安全连接耗时
  let sslTime = performanceData.connectEnd - performanceData.secureConnectionStart;

  // 计算TTFB 指发出页面请求到接收到应答数据第一个字节所花费的毫秒数 （跟请求响应时间差不多）
  let ttfbTime = performanceData.responseStart - performanceData.requestStart;

  // 计算页面加载时间 指从用户发起请求到页面完全呈现在屏幕上所经过的时间
  let pageLoadTime = performanceData.loadEventEnd - performanceData.domComplete;

  // 计算请求响应时间 指从用户发起请求到浏览器接收到服务器响应的第一个字节所经过的时间
  const requestResponseTime = performanceData.responseEnd - performanceData.requestStart;

  // 计算DOM解析耗时时间
  const domTime = performanceData.domInteractive - performanceData.responseEnd

  // 计算DOMContentLoaded耗时时间
  const domContentLoadedTime = performanceData.domContentLoadedEventEnd - performanceData.domContentLoadedEventStart


  // 计算白屏时间 （不同监控对白屏的计算方式也有所不同）
  var whiteScreenTime = performanceData.domInteractive - performanceData.responseStart;


  // 获取 FCP 时间
  let fcpTime = 0;
  const [fcpEntry] = performance.getEntriesByName("first-contentful-paint");
  if (fcpEntry) {
    fcpTime = fcpEntry.startTime;
  }

  // 获取 LCP 时间
  let lcpTime = 0;
  const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
  if (lcpEntries.length > 0) {
    lcpTime = lcpEntries[lcpEntries.length - 1].renderTime || lcpEntries[lcpEntries.length - 1].loadTime;
  }

  // Paint Timing
  const paintMetrics = performance.getEntriesByType('paint');
  paintMetrics.forEach((metric) => {
    console.log(metric.name + ': ' + metric.startTime + 'ms');
  });

  // 监听长任务
  let tti = 0;
  let tbt = 0;
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      // 计算 TBT
      if (entry.duration > 50) {
        tbt += entry.duration - 50;
      }
    }

    // 计算 TTI
    if (tti === 0 && tbt < 50) {
      tti = performance.now();
    }
  });
  observer.observe({ entryTypes: ["longtask"] });

  // 构造要发送的性能数据
  let perfData = {
    type: 'performance',
    redirectTime,
    cacheTime,
    sslTime,
    ttfbTime,
    domTime,
    domContentLoadedTime,
    pageLoadTime,
    dnsLookupTime,
    tcpConnectTime,
    whiteScreenTime,
    requestResponseTime,
    tbt,
    tti
  };
}

/* 
  获取资源（css，脚本，图片等）的时间
*/
const getResuorceTiming = () => {

  // 获取资源性能数据
  let resourceData = performance.getEntriesByType('resource');

  // 遍历资源数据
  resourceData.forEach(function (resource, i) {
    // 获取资源的相关信息，例如名称、类型、大小等
    let name = resource.name;
    let type = resource.initiatorType;
    let size = resource.transferSize;

    // 可计算的资源时间
    console.log(`== 资源 [${i}] - ${resource.name}`);
    // 重定向时间
    let t = resource.redirectEnd - resource.redirectStart;
    console.log(`… 重定向时间 = ${t}`);

    // DNS时间
    t = resource.domainLookupEnd - resource.domainLookupStart;
    console.log(`… DNS查询时间 = ${t}`);

    // TCP握手时间
    t = resource.connectEnd - resource.connectStart;
    console.log(`… TCP握手时间 = ${t}`);

    // 响应时间
    t = resource.responseEnd - resource.responseStart;
    console.log(`… 响应时间 = ${t}`);

    // 获取直到响应结束
    t =
      resource.fetchStart > 0 ? resource.responseEnd - resource.fetchStart : "0";
    console.log(`… 获取直到响应结束时间 = ${t}`);

    // 请求开始直到响应结束
    t = resource.requestStart > 0 ? resource.responseEnd - resource.requestStart : "0";
    console.log(`… 请求开始直到响应结束时间 = ${t}`);

    // 开始直到响应结束
    t = resource.startTime > 0 ? resource.responseEnd - resource.startTime : "0"; console.log(`… 开始直到响应结束时间 = ${t}`);
    // 构造要发送的资源数据
    let resData = {
      type: 'resource',
      name: name,
      resourceType: type,
      size: size,
      // 其它你想要收集的信息
    };
  })
}

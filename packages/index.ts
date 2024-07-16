import { InitOptions } from './types';
import { initErrorTracker } from './errorTracker';
import { initBehaviorTracker } from './behaviorTracker';
import { initConfig, monitorConfig } from './config';

/**
 * 初始化配置
 * @param {*} options 
 */

function init(options: InitOptions) {
  // ------- 初始化配置 ---------
  initConfig(options)
  // ------- 初始化错误监控 ---------
  initErrorTracker(options)
  // ------- 初始化行为监控 ---------
  initBehaviorTracker(options)

  // ------ 防止卸载时还有剩余的埋点数据没发送 ------
  // window.addEventListener('unload', () => {
  //   const data = getCache();
  //   report(data);

  //   // if (data.length > 0) {
  //   //   report(data);
  //   // }
  // });
}


export { init, monitorConfig };

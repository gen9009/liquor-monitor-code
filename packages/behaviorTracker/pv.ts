/*
  SPA 使用 history API 实现页面跳转
  重写history.pushState 和 history.replaceState，使页面跳转时，不刷新页面
  计算方式:

  第一种步骤
    1. 初始化时间，在window.load开始计算一次，pushState/replace计算一次(获得时间差)
    2. pushState/replaceState 再计算一次(获取时间差)

*/

import { report } from '../report';
import { HistoryType } from '../enum';

// 通用的时间和页面追踪器
class PageTracker {
  private beforeTime: number;
  private beforePage: string;

  constructor() {
    this.beforeTime = Date.now();
    this.beforePage = window.location.href; // 初始化为当前页面的 URL
  }

  getStayTime() {
    const curTime = Date.now();
    const stayTime = curTime - this.beforeTime;
    this.beforeTime = curTime;
    return stayTime;
  }

  updatePage() {
    const stayTime = this.getStayTime();
    const currentPage = window.location.href;
    report({
      stayTime,
      page: this.beforePage,
      
    });
    this.beforePage = currentPage;
  }
}

// 重写 history 方法并触发事件
const createHistoryEvent = (name: keyof History) => {
  const origin = window.history[name] as (...args: any[]) => any;
  return function (...args: any[]) {
    const res = origin.apply(window.history, args);
    const event = new Event(name);
    (event as any).arguments = args;
    window.dispatchEvent(event);
    return res;
  };
};

export function historyPageTrackerReport() {
  const tracker = new PageTracker();

  window.history.pushState = createHistoryEvent('pushState');
  window.history.replaceState = createHistoryEvent('replaceState');

  const listener = () => tracker.updatePage();

  window.addEventListener('pushState', listener);
  window.addEventListener('replaceState', listener);
  window.addEventListener('load', listener);
  window.addEventListener('unload', listener);
  window.addEventListener('popstate', listener);
}

export function hashPageTrackerReport() {
  const tracker = new PageTracker();

  const listener = () => tracker.updatePage();

  window.addEventListener('hashchange', listener);
  window.addEventListener('load', listener);

  window.history.pushState = createHistoryEvent('pushState');
  window.addEventListener('pushState', listener);
}

export const pvTracker = (mode: HistoryType = HistoryType.HISTORY) => {
  if (mode === HistoryType.HISTORY) {
    historyPageTrackerReport();
  } else {
    hashPageTrackerReport();
  }
}

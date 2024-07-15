import { ErrorType } from './enum';
/* 
  监控初始化参数
*/
export interface InitOptions extends IErrorTrackerOptions {
  appId: string;  // 应用id
  env: string;    // 环境信息
  server: string; // 上报地址
  autoTrack?: boolean; // 是否自动上报
  debug?: boolean; // 是否开启debug模式
  samplingRate?: number; // 采样率，0到1之间的浮点数
  enablePerformance?: boolean; // 是否启用性能监控
}
/* 
  错误监控配置
*/
export interface IErrorTrackerOptions {
  enablePromiseErrors?: boolean; // 是否启用Promise错误监控
  enableJSErrors?: boolean; // 是否启用JS错误监控
  enableResourceErrors?: boolean; // 是否启用资源错误监控
}
/* 
  公共上报数据
*/
export interface PublicErrorReport {
  timestamp: number; // 时间戳
  page: string; // 发生错误的页面URL
  userAgent: string; // 用户代理信息
  errorType: ErrorType; // 错误类型（如JS错误, 资源加载错误等）
  lineNo: number; // 发生错误的行号
  colNo: number; // 发生错误的列号
  filename: string; // 发生错误的文件名
  selector: string; // 发生错误的元素选择器
  stack?: string; // 错误堆栈信息（如果有）
  customData?: Record<string, any>; // 自定义数据
}

/* 
  JS错误上报字段
*/
export interface JSErrorReport extends PublicErrorReport {
  errorType: ErrorType.JS_ERROR;
  resourceUrl?: string; // 发生资源错误的资源URL（仅资源错误）
}

/* 
  资源错误上报字段
*/
export interface ResourceErrorReport extends PublicErrorReport {
  errorType: ErrorType.RESOURCE_ERROR;
  resourceUrl: string; // 发生资源错误的资源URL
}

/* 
  Promise错误上报字段
*/
export interface PromiseErrorReport extends PublicErrorReport {
  errorType: ErrorType.PROMISE_ERROR;
  errorMessage: string; // Promise错误信息
}

/* 
  HTTP错误上报字段
*/
export interface HTTPErrorReport extends PublicErrorReport {
  errorType: ErrorType.HTTP_ERROR;
  method: string; // HTTP请求方法
  statusCode: number; // HTTP状态码
  response: string; // HTTP响应内容
  resourceUrl: string; // 发生资源错误的资源URL
}


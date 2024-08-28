import { InitOptions } from "./types";
export const monitorConfig = Symbol.for('monitor');
export const initConfig = function (options: InitOptions) {
  window[monitorConfig] = options;
}
export default initConfig;

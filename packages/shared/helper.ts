import { IAnyObject } from "../types"
/**
 * @description: 重写属性
 * @return {*}
 * @param {*} source 需要重写的对象
 * @param {*} name 需要被重写的属性
 * @param {*} rewriter 重写原有函数 
 */
export const rewriteAttr = (source: IAnyObject, name: string, rewriter: (...arags: any[]) => any) => {
  if (source === undefined) return
  if (name in source) {
    source[name] = rewriter(source[name])
  }
}

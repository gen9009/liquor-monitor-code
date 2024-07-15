import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { dts } from 'rollup-plugin-dts'
import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: 'packages/index.ts', // 入口文件
    output: [
      {
        file: 'lib/index.esm.js',
        format: 'esm' // ES 模块文件
      },
      {
        file: 'lib/index.umd.js',
        format: 'umd', // umd 规范的可执行文件
        name: 'monitorSdk'
      }
    ],
    plugins: [typescript(), terser()]
  },
  {
    input: 'packages/types.d.ts',
    output: [{ file: 'lib/types.d.ts', format: 'es' }],
    plugins: [dts()]
  }
])

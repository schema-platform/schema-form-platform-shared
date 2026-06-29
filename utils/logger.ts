/**
 * 统一日志工具
 *
 * 带彩色前缀，便于在控制台快速区分模块。
 * 所有项目统一使用，不再各自 console.log。
 *
 * 用法：
 *   import { createLogger } from '@schema-platform/platform-shared/utils/logger'
 *   const log = createLogger('editor', '#0060A2')
 *   log.info('mount done')         →  [editor] mount done  （蓝色前缀）
 *   log.warn('token missing')      →  [editor] token missing（黄色前缀）
 *   log.error('failed', err)       →  [editor] failed （红色前缀）
 *   log.lifecycle('beforeMount')   →  [editor] beforeMount （紫色前缀）
 *   log.perf('fetchApps', 120)     →  [editor] fetchApps 120ms （绿色前缀）
 */

export interface Logger {
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  /** qiankun 生命周期日志（紫色） */
  lifecycle: (...args: unknown[]) => void
  /** 性能/耗时日志（绿色） */
  perf: (...args: unknown[]) => void
  /** 调试日志（灰色，生产环境不输出） */
  debug: (...args: unknown[]) => void
}

/**
 * 创建带彩色前缀的 logger
 *
 * @param tag - 模块名（如 'shell'、'editor'、'qiankun'）
 * @param color - 前缀颜色（CSS 颜色值，如 '#0060A2'、'#409EFF'）
 */
export function createLogger(tag: string, color: string): Logger {
  const prefix = `%c[${tag}]`
  const style = `color: ${color}; font-weight: bold;`
  const warnStyle = `color: #E6A23C; font-weight: bold;`
  const errorStyle = `color: #F56C6C; font-weight: bold;`
  const lifecycleStyle = `color: #9B59B6; font-weight: bold;`
  const perfStyle = `color: #67C23A; font-weight: bold;`
  const debugStyle = `color: #909399; font-weight: bold;`

  return {
    info: (...args: unknown[]) => console.log(prefix, style, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, warnStyle, ...args),
    error: (...args: unknown[]) => console.error(prefix, errorStyle, ...args),
    lifecycle: (...args: unknown[]) => console.log(prefix, lifecycleStyle, ...args),
    perf: (...args: unknown[]) => console.log(prefix, perfStyle, ...args),
    debug: (...args: unknown[]) => {
      if (import.meta.env.DEV) {
        console.log(prefix, debugStyle, ...args)
      }
    },
  }
}

// ── 预定义 logger（常用模块直接导出） ──

/** Shell 宿主日志（蓝色） */
export const shellLog = createLogger('shell', '#409EFF')

/** Qiankun 引擎日志（橙色） */
export const qiankunLog = createLogger('qiankun', '#E6A23C')

/** Editor 子应用日志（深蓝） */
export const editorLog = createLogger('editor', '#0060A2')

/** Flow 子应用日志（青色） */
export const flowLog = createLogger('flow', '#00BCD4')

/** AI 子应用日志（科技蓝） */
export const aiLog = createLogger('ai', '#00D4FF')

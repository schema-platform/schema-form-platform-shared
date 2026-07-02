/**
 * useQiankunShell — 子应用与 Shell 宿主导航
 *
 * mount 时由 initQiankunShellProps 注入 navigateTo，
 * 组件内通过 useQiankunShell 判断是否嵌入宿主、是否隐藏子应用侧栏。
 */
import { computed, ref } from 'vue'
import { APP_CONFIGS } from './config'

type NavigateToFn = (path: string, query?: Record<string, string>) => void

export type ShellEmbedMode = 'app' | 'standalone' | 'independent'

const SHELL_BASE = APP_CONFIGS.shell.basePath.replace(/\/$/, '')

const hostMounted = ref(false)
let shellNavigateTo: NavigateToFn | null = null

const shellEmbedMode = ref<ShellEmbedMode>(resolveShellEmbedMode())

export function resolveShellEmbedMode(
  pathname = window.location.pathname,
  getRouteBase?: () => string,
): ShellEmbedMode {
  if (typeof getRouteBase === 'function') {
    const base = getRouteBase()
    if (base.includes('/app/')) return 'app'
    if (base.includes('/standalone/')) return 'standalone'
  }

  if (new RegExp(`^${SHELL_BASE}/app/(editor|flow|ai)(/|$)`).test(pathname)) {
    return 'app'
  }
  if (new RegExp(`^${SHELL_BASE}/standalone/(editor|flow|ai)(/|$)`).test(pathname)) {
    return 'standalone'
  }
  return 'independent'
}

function detectShellEmbedMode(getRouteBase?: () => string): ShellEmbedMode {
  return resolveShellEmbedMode(window.location.pathname, getRouteBase)
}

/** 子应用 mount 生命周期调用，注入 shell 下发的 navigateTo */
export function initQiankunShellProps(props: Record<string, unknown>): void {
  const navigateTo = props.navigateTo as NavigateToFn | undefined
  if (typeof navigateTo === 'function') {
    shellNavigateTo = navigateTo
    hostMounted.value = true
  }

  const getRouteBase = props.getRouteBase as (() => string) | undefined
  shellEmbedMode.value = detectShellEmbedMode(getRouteBase)
}

export function useQiankunShell() {
  /** 是否由 shell 以 qiankun 子应用方式挂载（含 /app 与 /standalone） */
  const isQiankunSubApp = computed(
    () => hostMounted.value
      || !!window.__POWERED_BY_QIANKUN__
      || shellEmbedMode.value !== 'independent',
  )

  /** shell /app 容器内隐藏子应用侧栏（宿主已提供菜单） */
  const shouldHideSubAppMenu = computed(() => shellEmbedMode.value === 'app')

  function goToShellHome(): void {
    if (shellNavigateTo) {
      shellNavigateTo('/')
      return
    }
    const { origin } = window.location
    window.location.href = `${origin}${APP_CONFIGS.shell.basePath}`
  }

  return {
    isQiankunSubApp,
    shouldHideSubAppMenu,
    shellEmbedMode: computed(() => shellEmbedMode.value),
    goToShellHome,
  }
}

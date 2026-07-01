/**
 * useQiankunShell — 子应用与 Shell 宿主导航
 *
 * mount 时由 initQiankunShellProps 注入 navigateTo，
 * 组件内通过 useQiankunShell 判断是否嵌入宿主并返回首页。
 */
import { computed, ref } from 'vue'
import { APP_CONFIGS } from './config'

type NavigateToFn = (path: string, query?: Record<string, string>) => void

const hostMounted = ref(false)
let shellNavigateTo: NavigateToFn | null = null

/** 子应用 mount 生命周期调用，注入 shell 下发的 navigateTo */
export function initQiankunShellProps(props: Record<string, unknown>): void {
  const navigateTo = props.navigateTo as NavigateToFn | undefined
  if (typeof navigateTo === 'function') {
    shellNavigateTo = navigateTo
    hostMounted.value = true
  }
}

export function useQiankunShell() {
  /** 是否由 shell 以 qiankun 子应用方式挂载（非独立运行） */
  const isQiankunSubApp = computed(() => hostMounted.value)

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
    goToShellHome,
  }
}

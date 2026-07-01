<script setup lang="ts">
/**
 * AppIcon — 统一图标组件
 *
 * 基于 Iconify + @iconify-icons/ep，按需加载 Element Plus 图标。
 * 所有项目统一使用此组件，替代直接 import @element-plus/icons-vue。
 *
 * 用法：
 *   <AppIcon name="home-filled" :size="18" />
 *   <AppIcon name="setting" color="var(--color-primary)" />
 *
 * 图标必须在 utils/iconRegistry.ts 中注册，禁止编造名称。
 */
import { computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import { ICON_MAP } from '../../utils/iconRegistry'

const props = defineProps<{
  /** 图标名称（kebab-case，如 'home-filled'、'setting'） */
  name: string
  /** 图标大小（px） */
  size?: number | string
  /** 图标颜色 */
  color?: string
}>()

const iconComponent = computed(() => ICON_MAP[props.name] ?? null)
const iconSize = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  return props.size ?? '1em'
})

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (!iconComponent.value) {
      console.warn(
        `[AppIcon] 未注册的图标 "${props.name}"，请在 platform-shared/utils/iconRegistry.ts 中添加（图标须存在于 @iconify-icons/ep）`,
      )
    }
  })
}
</script>

<template>
  <Icon
    v-if="iconComponent"
    :icon="iconComponent"
    :width="iconSize"
    :height="iconSize"
    :style="color ? { color } : undefined"
  />
  <span v-else :style="{ fontSize: iconSize, color, width: iconSize, height: iconSize, display: 'inline-block' }" aria-hidden="true" />
</template>

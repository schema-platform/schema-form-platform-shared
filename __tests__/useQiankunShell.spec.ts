import { describe, it, expect } from 'vitest'
import { resolveShellEmbedMode } from '../qiankun/useQiankunShell'

describe('resolveShellEmbedMode', () => {
  it('detects shell app container paths', () => {
    expect(resolveShellEmbedMode('/schema-platform/app/flow/tasks')).toBe('app')
    expect(resolveShellEmbedMode('/schema-platform/app/editor/instances')).toBe('app')
    expect(resolveShellEmbedMode('/schema-platform/app/ai/workflows')).toBe('app')
  })

  it('detects shell standalone paths', () => {
    expect(resolveShellEmbedMode('/schema-platform/standalone/flow/tasks')).toBe('standalone')
    expect(resolveShellEmbedMode('/schema-platform/standalone/editor/')).toBe('standalone')
  })

  it('detects independent dev entry', () => {
    expect(resolveShellEmbedMode('/')).toBe('independent')
    expect(resolveShellEmbedMode('/tasks')).toBe('independent')
  })

  it('prefers getRouteBase when provided', () => {
    expect(resolveShellEmbedMode('/', () => '/schema-platform/app/flow')).toBe('app')
    expect(resolveShellEmbedMode('/', () => '/schema-platform/standalone/ai')).toBe('standalone')
  })
})

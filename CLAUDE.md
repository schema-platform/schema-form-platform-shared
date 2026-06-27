# schema-form-platform-shared

`@schema-platform/platform-shared` — 平台公共组件与工具库。

## 项目规则

### 技术栈
- TypeScript + Vue 3 组件
- 发布为 npm 包（GitHub Packages）

### 职责范围
- `components/` — AppDialog、AppIcon 等平台级公共组件
- `utils/` — apiClient、config 等公共工具
- `qiankun/` — 微前端集成工具
- `post-message/` — 跨应用通信
- `socket/` — WebSocket 工具
- `styles/` — 全局样式

### 架构规则
- **零业务逻辑**：只包含平台级通用能力，不含任何具体业务逻辑
- **API 客户端**：`utils/apiClient` 是所有前端应用统一的 HTTP 客户端
- **组件隔离**：公共组件必须开启 CSS Module

### 导出规范
- 主入口：`./dist/index.js`
- 组件：`./components/*`
- 工具：`./utils/apiClient` 等

## 迭代规则

- **禁止回滚 git**，渐进式推进
- 变更需评估对所有下游应用（shell、editor、flow、ai）的影响
- 公共组件变更必须向后兼容，破坏性变更需版本升级

## 常用命令

```bash
pnpm build    # vite build
pnpm test     # vitest run
```

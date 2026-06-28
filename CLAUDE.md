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

### 发包规则
- **修改后必须发包**：本包是公共依赖，修改源码后必须更新版本号 → `pnpm publish`，否则下游项目的改动不生效。
- **发包前本地验证**：先通过 `workspace:*` 链接在下游项目验证功能正确，确认无误后再发包。

### 环境规则
- **gh CLI 已认证**：`gh` 已登录、`GITHUB_TOKEN` 环境变量已就绪，禁止检查 token、禁止询问用户设置

### 代码质量规则
- **禁止跳过问题**：遇到任何报错、警告、异常，必须找到根因并修复，不能以"预存问题""之前就有""不影响运行"为由跳过。每个问题都要记录原因和修复方式

### 项目隔离规则
- **禁止跨项目修改**：本项目只能修改自己的代码，禁止修改其他项目。需要改其他项目时，明确告知用户。

## 迭代规则

- **禁止回滚 git**，渐进式推进
- 变更需评估对所有下游应用（shell、editor、flow、ai）的影响
- 公共组件变更必须向后兼容，破坏性变更需版本升级

## 常用命令

```bash
pnpm build    # vite build
pnpm test     # vitest run
```

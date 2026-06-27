# @schema-form/platform-shared

Schema Form Platform 核心共享层，提供所有前端项目共用的组件、工具和配置。

## 安装

```bash
npm install @schema-form/platform-shared
```

## 主要内容

### 组件
- `AppIcon` - 统一图标组件（基于 Iconify）
- `AppDialog` - 对话框组件
- `LoginView` - 登录/注册页面
- `AuthCallback` - SSO 回调处理

### 工具
- `apiClient` - Axios HTTP 客户端
- `useAuth` - 认证组合函数
- `sso` - SSO 客户端

### Qiankun 微前端
- `createQiankunApp` - 创建 qiankun 子应用
- `APP_CONFIGS` - 子应用配置表
- `buildMicroAppUrl` - 生成子应用 URL

### 样式
- `tokens.css` - 设计令牌
- `design-tokens.css` - 设计系统变量

### 配置
- `createViteConfig` - Vite 配置工厂
- `setupElementPlus` - Element Plus 配置

## 使用

```typescript
// 组件
import { AppIcon, AppDialog } from '@schema-form/platform-shared/components/common'

// 工具
import { apiClient } from '@schema-form/platform-shared/utils/apiClient'
import { useAuth } from '@schema-form/platform-shared/utils/useAuth'

// Qiankun
import { createQiankunApp } from '@schema-form/platform-shared/qiankun/createQiankunApp'
import { APP_CONFIGS } from '@schema-form/platform-shared/qiankun/config'

// 样式
import '@schema-form/platform-shared/styles/tokens.css'
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 测试
pnpm test
```

## 许可证

MIT

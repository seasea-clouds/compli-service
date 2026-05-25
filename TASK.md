# TASK.md — Compli-Service 详细任务清单

> 优先级：P0=阻塞项 / P1=核心功能 / P2=优化 / P3=远期
> 执行规则：从 P0 开始，同优先级可并行

---

## ✅ Phase 0：已完成（18 项）

- [x] T01. 项目初始化（Next.js + Tailwind + TypeScript + Pages）
- [x] T02. Core 层（支付/邮件/PDF/D1 Schema）
- [x] T03. 首页 6 服务入口卡片
- [x] T04. GACC 自查表单（3 步）
- [x] T05. GACC 判断逻辑（rules.ts + report.ts）
- [x] T06. Pages Functions 骨架（Webhook + 报告生成）
- [x] T07. 报告展示组件（ReportViewer + PDF 模板）
- [x] T08. 定价页
- [x] T09. 构建验证
- [x] T10. GitHub 仓库 `seasea-clouds/compli-service`
- [x] T11. CF Pages 部署 `compli-service.pages.dev`
- [x] T12. 环境变量配置（密钥类型 secret_text）
- [x] T13. 48 语言 i18n（next-intl + LanguageSwitcher）
- [x] T14. 页头页脚与主站完全对齐
- [x] T15. 品牌 Header/Footer（已升级到 T14）

---

## 🔴 P0 — 阻塞项（必须先做）

### T-WORKER. Worker 路由 `sinotradecompliance.com/compli-service/*`
- **依赖：** 无
- **内容：** 将主站子路径路由到用户站 Pages 项目
- **步骤：**
  - [ ] T-WORKER-1. 在 compli-service Pages 项目添加自定义域 `sinotradecompliance.com` + 路径 `/compli-service/*`
  - [ ] T-WORKER-2. 验证路由生效，主站导航指向 `/compli-service/` 而非 `.pages.dev`
  - [ ] T-WORKER-3. 检查 _redirects / _headers 兼容性，确保子路径资源加载正常

### T-I18N-LINK. Header/Footer 链接改为 `useLocale()` 动态语言
- **依赖：** 无
- **内容：** 所有指向主站的链接从硬编码 `/en/` 改为 `useLocale()` 动态构造
- **步骤：**
  - [ ] T-I18N-LINK-1. Header.tsx 中所有 `href={`${BASE}/en/...`}` 改为 `${BASE}/${locale}/...`
  - [ ] T-I18N-LINK-2. Footer.tsx 同样改造
  - [ ] T-I18N-LINK-3. `useLocale()` 从 next-intl 导入，确保 locale 变量正确传递
  - [ ] T-I18N-LINK-4. 构建验证 + 部署

---

## 🟠 P1 — 核心功能

### T-AUTH. 登录/注册系统
- **依赖：** 无
- **内容：** JWT + localStorage + Pages Functions auth
- **步骤：**
  - [x] T-AUTH-1. JWT 签发与验证（jose）
  - [x] T-AUTH-2. 密码哈希（Web Crypto API PBKDF2）
  - [x] T-AUTH-3. AuthProvider 全局 context
  - [x] T-AUTH-4. ProtectedRoute 路由守卫
  - [x] T-AUTH-5. Register Pages Function
  - [x] T-AUTH-6. Login Pages Function
  - [x] T-AUTH-7. User info API（token 验证）
  - [x] T-AUTH-8. 登录页面
  - [x] T-AUTH-9. 注册页面
  - [x] T-AUTH-10. Dashboard 首页
  - [x] T-AUTH-11. Layout 包裹 AuthProvider
  - [x] T-AUTH-12. D1 Schema users 表（已存在）
  - [x] T-AUTH-13. 构建验证 + 部署 ✅

### T-MODULES. 其他 5 个自查模块
- **依赖：** 无（可并行）
- **内容：** 各模块：表单 + 判断逻辑 + 报告
- **步骤：**
  - [ ] T-MODULES-1. 中文标签合规（label）— 表单 + rules.ts + report.ts + page.tsx
  - [ ] T-MODULES-2. CCC 认证（ccc）— 同上
  - [ ] T-MODULES-3. 化妆品备案（cosmetic s/NMPA）— 同上
  - [ ] T-MODULES-4. 跨境电商（crossborder）— 同上
  - [ ] T-MODULES-5. 品牌保护（trademark）— 同上
  - [ ] T-MODULES-6. 首页 6 卡片全部指向对应模块
  - [ ] T-MODULES-7. 构建验证 + 部署

### T-REPORT-CTA. 自查报告末尾 CTA
- **依赖：** T-I18N-LINK
- **内容：** 每份报告末尾引导"联系专家"
- **步骤：**
  - [ ] T-REPORT-CTA-1. 创建 `src/components/ExpertCta.tsx` — 报告末尾 CTA 组件
  - [ ] T-REPORT-CTA-2. 集成到 ReportViewer 组件中
  - [ ] T-REPORT-CTA-3. 添加翻译 key 到 JSON 消息文件
  - [ ] T-REPORT-CTA-4. 构建验证 + 部署

### T-PRICING. 定价页新增 Professional Service 档
- **依赖：** T-I18N-LINK
- **内容：** 第四档 $500+ 指向主站 packages
- **步骤：**
  - [ ] T-PRICING-1. 定价页添加第四列 Professional Service
  - [ ] T-PRICING-2. 链接到 `https://sinotradecompliance.com/{locale}/packages/`
  - [ ] T-PRICING-3. 更新消息文件翻译 key
  - [ ] T-PRICING-4. 构建验证 + 部署

### T-PAYMENT. Creem 支付真实接入
- **依赖：** T-AUTH
- **内容：** 真实 Creem API 调用
- **步骤：**
  - [ ] T-PAYMENT-1. Creem 测试环境验证 API key
  - [ ] T-PAYMENT-2. 更新 checkout Pages Function 使用真实 API
  - [ ] T-PAYMENT-3. Webhook 处理真实回调
  - [ ] T-PAYMENT-4. 端到端测试支付流程
  - [ ] T-PAYMENT-5. 构建验证 + 部署

---

## 🟡 P2 — 优化

### T-MAIN-NAV. 主站 Navbar 新增 "Free Check" 按钮
- **依赖：** T-WORKER
- **内容：** 修改主站 Navbar.tsx
- **步骤：**
  - [ ] T-MAIN-NAV-1. 主站 Navbar.tsx 顶栏新增按钮（WhatsApp 旁）
  - [ ] T-MAIN-NAV-2. 指向 `/compli-service/`
  - [ ] T-MAIN-NAV-3. 添加翻译 key 到 48 语言 JSON
  - [ ] T-MAIN-NAV-4. 构建验证 + 部署

### T-MAIN-CTA. 主站首页/服务页 CTA
- **依赖：** T-WORKER
- **步骤：**
  - [ ] T-MAIN-CTA-1. 首页 Hero 下方加 "Try compliance checker" 引导
  - [ ] T-MAIN-CTA-2. 各服务页底部加对应模块 CTA
  - [ ] T-MAIN-CTA-3. 构建验证 + 部署

### T-COOKIE. CookieConsent 占位
- **依赖：** 无
- **步骤：**
  - [ ] T-COOKIE-1. 创建空壳 `src/components/CookieConsent.tsx`
  - [ ] T-COOKIE-2. 在 layout.tsx 预留插槽

---

## 🔵 P3 — 远期

### T-LOCALE-ROUTE. Worker 路由支持 `/{locale}/compli-service/*`
### T-TRANSLATE. 用户站各语言翻译填充

---

> **执行顺序：** P0 → P1 → P2 （同优先级可并行）
> **Git：** 每个任务至少一次独立 commit，便于回滚
> **部署：** 每个独立功能完成后 push → CF 自动部署

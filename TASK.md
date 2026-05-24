# TASK.md — Compli-Service 任务清单

## 📌 当前状态（2026-05-23 18:52 CST）

**Phase：** MVP 开发中 — 邮件 + PDF 集成 ✅

### ✅ 已完成

- [x] T1. 项目初始化（Next.js + Tailwind + TypeScript + Pages 配置）
- [x] T2. Core 层搭建
  - [x] T2.1 支付接口（PaymentProvider 抽象 + Creem 实现）
  - [x] T2.2 邮件接口（EmailProvider 抽象 + Resend 实现）
  - [x] T2.3 PDF 生成（@react-pdf + 报告模板 + 生成器）
  - [x] T2.4 邮件服务（发送报告 + Magic Link）
  - [x] T2.5 D1 数据库 Schema（reports + users + subscriptions）
- [x] T3. 首页 — 6 服务入口卡片
- [x] T4. GACC 自查表单（3 步）
- [x] T5. GACC 判断逻辑（rules.ts + report.ts）
- [x] T6. Pages Functions 骨架
  - [x] 支付 Webhook（Creem 回调处理）
  - [x] 报告生成 API（PDF + 邮件 + D1 写入选定）
- [x] T7. 报告展示组件（ReportViewer + PDF 模板）
- [x] T8. 品牌 Header/Footer
- [x] T9. 定价页
- [x] T10. 构建验证 ✅

### ⏳ 待完成

- [ ] T11. Creem 支付真实接入
- [ ] T12. 登录/注册（邮箱+密码+Turnstile）
- [x] T13. GitHub 远程仓库配置
- [x] T14. Cloudflare Pages 部署（`compli-service.pages.dev`）
- [ ] T14b. Worker 路由配置（`sinotradecompliance.com/compli-service/*`）
- [ ] T15. 其他 5 个模块补充（label/ccc/nmpa/crossborder/trademark）

# TASK.md — Compli-Service 任务清单

## 📌 当前状态（2026-05-25 08:46 CST）

**Phase 1：部署上线 ✅ — 基础架构就绪**

### ✅ 已完成

- [x] T1. 项目初始化（Next.js + Tailwind + TypeScript + Pages 配置）
- [x] T2. Core 层搭建（支付/邮件/PDF/D1 Schema）
- [x] T3. 首页 6 服务入口卡片
- [x] T4. GACC 自查表单（3 步）
- [x] T5. GACC 判断逻辑（rules.ts + report.ts）
- [x] T6. Pages Functions 骨架（支付 Webhook + 报告生成 API）
- [x] T7. 报告展示组件（ReportViewer + PDF 模板）
- [x] T8. 品牌 Header/Footer（与主站完全一致）
- [x] T9. 定价页
- [x] T10. 构建验证
- [x] T13. GitHub 远程仓库 `seasea-clouds/compli-service`
- [x] T14. CF Pages 部署 `compli-service.pages.dev`
- [x] T14a. 环境变量配置（密钥类型 secret_text）
- [x] T16. 48 语言 i18n 支持（next-intl + LanguageSwitcher）
- [x] T17. 页头页脚与主站 Navbar/Footer 完全对齐

### ⏳ Phase 2：功能完善（待开发）

- [ ] T11. Creem 支付真实接入
- [ ] T12. 登录/注册（JWT + localStorage + Pages Functions auth）
- [ ] T12a. AuthProvider + ProtectedRoute 组件
- [ ] T14b. Worker 路由配置（`sinotradecompliance.com/compli-service/*`）
- [ ] T15. 其他 5 个模块表单 + 判断逻辑（label/ccc/nmpa/crossborder/trademark）
- [ ] T18. 自查报告末尾 CTA（引导联系专家）
- [ ] T19. 定价页新增 "Professional Service" 档
- [ ] T20. Header/Footer 链接改为 `useLocale()` 动态语言

### 🔮 Phase 3：优化与扩展

- [ ] T21. 主站 Navbar 新增 "Free Check" 按钮
- [ ] T22. 主站首页/服务页 CTA → compli-service
- [ ] T23. Worker 路由支持 `/{locale}/compli-service/*`
- [ ] T24. 用户站其他语言翻译
- [ ] T25. CookieConsent 占位组件

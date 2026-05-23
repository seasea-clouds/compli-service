# NOTES.md — 技术决策与踩坑记录

## 架构决策

| 决策 | 方案 | 理由 |
|------|------|------|
| 路径 | `/compli-service/` 子路径 | SEO 最优，继承主域权重 |
| 支付 | Creem（PaymentProvider 抽象） | Merchant of Record，松耦合可换 |
| 邮件 | Resend（EmailProvider 抽象） | 已测通，松耦合可换 |
| PDF | @react-pdf/renderer v4.5.1 | React 组件生成 PDF，风格一致 |
| 人机验证 | CF Turnstile | 免费、无感、CF 原生 |
| 认证 | 邮箱+密码（bcrypt）+ JWT | 轻量、零依赖第三方 |
| 部署 | Pages + Worker 路由 | 独立 CI/CD，互不影响 |

## Creem 支付

- Creem 是 Merchant of Record，处理全球税务合规
- API 认证：`x-api-key` header
- 测试环境：`https://test-api.creem.io`
- 生产环境：`https://api.creem.io`
- 需要先在 Creem 创建产品获取 `product_id`
- Webhook 监听：checkout.completed / subscription.created / subscription.cancelled
- 详细步骤见 [SOP.md](./SOP.md#-creem-支付接入流程)

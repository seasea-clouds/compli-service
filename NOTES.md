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
| 多语言 | next-intl + 主站 locale 列表 | 48 语言特色，与主站一致 |

## Creem 支付

- Creem 是 Merchant of Record，处理全球税务合规
- API 认证：`x-api-key` header
- 测试环境：`https://test-api.creem.io`
- 生产环境：`https://api.creem.io`
- 需要先在 Creem 创建产品获取 `product_id`
- Webhook 监听：checkout.completed / subscription.created / subscription.cancelled
- 详细步骤见 [SOP.md](./SOP.md#-creem-支付接入流程)

## Cloudflare Pages 部署

- **项目名：** `compli-service`
- **生产域名：** `https://compli-service.pages.dev`
- **构建配置：** `npm run build` → `out/`
- **GitHub 关联：** `seasea-clouds/compli-service` → master 分支自动部署
- **工作流：** push → CF Pages 自动构建 → 1-2 分钟上线
- **2026-05-24 初始部署上线成功**

## 环境变量管理

- **开发环境：** `~/.openclaw/.env` 统一凭证库 + `project/.env` 本地副本
- **CF Pages：** Preview + Production 各自配置，密钥类型 `secret_text`
- **已配置变量：** CREEM_API_KEY, CREEM_WEBHOOK_SECRET, CREEM_PRODUCT_ID_*, RESEND_API_KEY, EMAIL_FROM, NODE_VERSION=22

## i18n 多语言

- 依赖：`next-intl`
- 框架从主站复制：`routing.ts`（48 locale）、`messages.ts`、`request.ts`
- 当前所有语言使用英文消息，后续可逐语种翻译
- LanguageSwitcher 直接从主站复制适配
- 语言切换目前跳转到主站对应页面（`sinotradecompliance.com/{locale}/`）

## 页头页脚

- 从主站直接复制 Navbar.tsx / Footer.tsx 适配
- 导航栏：Services(下拉) | Industries(下拉) | About | Packages | FAQ | Insights | LanguageSwitcher
- 第一行：Logo | WhatsApp | Get a Quote
- 页脚 4 列：Services(6) | Quick Links(5) | Contact(col-span-2)
- 外部链接指向主站（`target="_blank"`），内部页面保留本站路由

## 进度记录

- **2026-05-23:** 项目初始化，Core 层（支付/邮件/PDF），GACC 模块，首页，定价页
- **2026-05-24:** GitHub 仓库 + CF Pages 部署 + 环境变量配置 + 48语言 i18n + 页头页脚与主站对齐

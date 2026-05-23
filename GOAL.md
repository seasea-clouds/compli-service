# GOAL.md — Compli-Service 官网用户后台

## 项目目标

为 SinoTrade Compliance 官网提供**六大合规自查工具**，海外出口商：
- 免费自查产品是否需中国合规认证
- 付 $0.99 获取完整合规报告（网页+PDF+邮件）
- 注册后管理历史报告、订阅等服务

## 核心规则

| 规则 | 说明 |
|------|------|
| ❌ 不展示代办价格 | 报告内费用栏统一引导"联系我们获取报价" |
| ✅ 品牌一致 | 复用主站配色 `#1B365D`/`#D4AF37`/`#F4F6F9` |
| ✅ 松耦合 | 支付/邮件模块接口化，未来可换服务商 |
| ✅ 子路径 | `/compli-service/` 子路径部署，Worker 路由 |
| ✅ 48 语言 | 复用主站翻译体系（未来阶段） |

## 定价体系

| 档位 | 价格 | 说明 |
|------|------|------|
| 免费 | $0 | 基础判断结果，不登录 |
| 单次报告 | $1 | 不登录支付，网页+PDF+邮件 |
| 订阅 | $9.9/月 | 登录后无限次使用 |

## 六大服务

| 模块 | 输入 | 输出 |
|------|------|------|
| **GACC 食品注册** | 品类、来源国、产品描述 | 是否需要注册 + 材料清单 |
| **中文标签合规** | 品类、规格 | 标签要求清单 |
| **CCC 认证** | 产品类型、HS编码 | 是否需要 CCC + 路径 |
| **化妆品备案** | 品类、成分 | NMPA 备案分类 + 清单 |
| **跨境电商** | 品类、平台 | 合规要求 + 所需材料 |
| **品牌保护** | 商标、品类 | 保护策略 + 注册建议 |

## 页面路由

```
/compli-service/                            首页 — 6 服务入口
/compli-service/check/[module]/             自查表单
/compli-service/report/[id]/                报告页
/compli-service/pricing/                    定价页
/compli-service/auth/login                  登录
/compli-service/auth/register               注册
/compli-service/dashboard/                  用户后台
/compli-service/dashboard/reports/          历史报告
/compli-service/dashboard/billing/          订阅管理
```

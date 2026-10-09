# 前端工程契约

用于 AI 辅助开发的跨项目、版本化前端工程规范，附带 React 单页应用模板。

## 默认原则

- 默认使用中文：文档、用户界面、操作提示、测试说明和 Agent 交付报告均采用中文。技术标识符、代码 API、第三方专有名称保留原文。
- 优先采用 React + TypeScript + Vite 的纯前端 SPA。未经明确论证和批准，不引入 SSR。
- 采用成熟社区组件库，统一主题、路由与验收要求。
- 旧项目可以增量接入，不强制迁移现有组件库或重写业务代码。

## 使用方法

要求 Node.js 20 或更新版本。

```bash
# 创建新项目（目标目录必须为空）
node bin/contract.mjs create ~/Developer/new.front

# 给现有项目接入契约（保留现有业务代码）
node bin/contract.mjs adopt ~/Developer/existing.front

# 检查项目
node bin/contract.mjs check ~/Developer/new.front
```

新项目创建后，在项目目录执行 `pnpm install` 和 `pnpm exec playwright install chromium`。

每个项目都会保存自己的契约快照和版本号。契约升级需要显式执行并单独审查，不能静默覆盖项目约束。现有项目的历史例外和未完成的检查记录在 `docs/frontend-contract/BASELINE.md`。

## 目录说明

- `contract/FRONTEND.md`：前端架构、UI、路由和质量规范
- `contract/AGENT.md`：Agent 开发行为规范
- `contract/DATA-DISPLAY.md`：表格对齐、金额和测量指标展示规范
- `templates/react-spa/`：可运行的 SPA 项目模板
- `bin/contract.mjs`：创建、接入、检查命令
- `tests/`：契约命令测试

当前版本：**v0.1.0**。检查命令只执行项目已有的检查脚本；缺失的检查会明确标为“未验证”，不会冒充通过。

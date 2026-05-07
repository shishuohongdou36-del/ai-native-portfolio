# Feature Specification: AI Native Builder Portfolio Website

**Feature Branch**: `001-ai-native-portfolio`
**Created**: 2026-05-07
**Status**: Draft
**Input**: 重构现有个人网站为一个高质量、视觉冲击力强的 AI Native Builder / AI 产品经理个人作品站。整体风格参考 Shoya Kajita Portfolio 的 futuristic / experimental / immersive 感受，但**仅作灵感借鉴**，不复刻其布局、文案、视觉资产。主题定位为 “AI Agent Control Room / Digital Experimental Lab”。

---

## 1. Background & Intent

### 1.1 Site Owner Positioning

- AI 产品经理 / AI Native Builder
- 大模型应用实践者，擅长 RAG、Multi-Agent、AI Workflow、AI Coding
- 拥有保险行业 B 端 AI 项目经验
- 网站需同时表达：**前沿技术感** + **专业方法论** + **个人品牌表达**

### 1.2 Design North Star

> 让访客在打开页面的第一秒，意识到这不是一份简历，而是一个 AI Builder 的“数字实验室”。炫技服务于专业表达，而非取代它。

### 1.3 Anti-Goals (明确不要)

- 不做传统简历页
- 不做 SaaS 官网风
- 不做模板化 portfolio
- 不做廉价赛博朋克 / 大面积霓虹渐变
- 不允许特效喧宾夺主，导致信息难读
- 不复刻参考站具体布局 / 文案 / 图像 / 品牌元素

---

## 2. User Scenarios & Testing _(mandatory)_

### User Story 1 — 首屏 Wow Moment 与身份识别 (Priority: P1)

一个潜在合作方（HR、客户、技术同行）通过链接首次进入网站。在 3 秒内，他需要被首屏的视觉与交互“击中”，并立刻明白：这是谁、他做什么、他的技术风格属于哪一档。

**Why this priority**: 没有这一刻，用户在 5 秒内就会离开，后面所有内容形同虚设。这是网站作为“个人品牌入口”的核心价值。

**Independent Test**: 仅部署 Hero + 全局视觉系统，关闭其他 section，邀请 5 位陌生测试者打开站点 10 秒后描述“这个人是谁、做什么的”，至少 4 人能正确说出 “AI 产品经理 / AI Builder / 大模型方向”。

**Acceptance Scenarios**:

1. **Given** 用户首次访问首页，**When** 页面完成首屏加载，**Then** 屏幕呈现深色背景、醒目的姓名与身份标语、以及一个**持续运行的可交互视觉主体**（如粒子场 / 节点系统 / 动态网格 / 漂浮模块之一）。
2. **Given** 用户在首屏移动鼠标 / 触摸滑动，**When** 指针位置变化，**Then** 视觉主体在 100ms 内做出可感知但克制的响应（视差、发光强度、节点联动等），且不引起页面卡顿。
3. **Given** 用户设备拒绝摄像头权限或不支持 WebGL，**When** 进入首屏，**Then** 系统自动退化为纯鼠标 / CSS 动效版本，仍能展示完整身份信息与首屏记忆点。

---

### User Story 2 — 能力地图与项目佐证 (Priority: P1)

招聘方或潜在客户在首屏被吸引后，需要快速回答：“他到底能做什么？做过什么？产生了什么价值？”

**Why this priority**: 这是把“视觉吸引力”转化为“专业信任感”的关键链路，缺失则网站只是炫技玩具。

**Independent Test**: 单独渲染 Capability Map + Featured Projects 两个 section，用户能在 60 秒内说出至少 3 个能力域和 2 个项目案例及其价值结果。

**Acceptance Scenarios**:

1. **Given** 用户滚动至 Capability Map，**When** section 进入视口，**Then** 6 项核心能力（RAG / Multi-Agent / Workflow Design / Evaluation & Bad Case / AI Coding / Insurance AI）以视觉化方式呈现（卡片 / 节点网络 / 轨道 / 悬浮标签等之一），每项可点击或 hover 展示一句话说明。
2. **Given** 用户进入 Featured Projects，**When** 浏览项目卡片，**Then** 每张卡片包含：项目名、简介、角色职责、价值结果，且 hover 时有精致的层级动效（不只是放大）。
3. **Given** 用户在移动端，**When** 浏览能力地图与项目区，**Then** 所有信息以单列或双列响应式呈现，所有交互改为 tap 触发，无任何信息因效果而被截断或遮挡。

---

### User Story 3 — 方法论与思考沉淀 (Priority: P2)

技术同行 / 深度访客希望理解“他怎么思考、怎么工作”，而不仅仅是“他做过什么”。

**Why this priority**: 这是 Builder 与普通从业者的分水岭，决定了网站能否承载“个人品牌”的长期复利。

**Independent Test**: 仅渲染 Methodology + Writing 两个 section，用户能复述出至少 3 个方法论步骤及其先后关系。

**Acceptance Scenarios**:

1. **Given** 用户进入 Methodology section，**When** 滚动浏览，**Then** 6 步方法论（Problem Framing → Workflow Decomposition → Evaluation Loop → Bad Case Attribution → Strategy Refinement → Skill / Productization）以**有顺序感**的视觉结构（时间线 / 流程 / 编号模块）呈现。
2. **Given** 用户进入 Writing section，**When** 浏览文章列表，**Then** 每条以未来感模块卡形式呈现，包含标题、主题标签、简短摘要，hover 有反馈，可点击跳转外链或留 placeholder。

---

### User Story 4 — 联系与转化 (Priority: P2)

访客决定联系站主时，需在不超过 1 次滚动 / 1 次点击内找到联系方式。

**Why this priority**: 转化漏斗的最末端，缺失会让前面所有努力流失。

**Independent Test**: 任意页面位置，用户能在 5 秒内找到至少一个有效联系入口（顶部导航、底部 CTA、Contact section 任一）。

**Acceptance Scenarios**:

1. **Given** 用户滚动到 Contact section，**When** 查看页面，**Then** 邮箱、GitHub、其他渠道清晰可见，主 CTA 按钮醒目但克制（无大面积霓虹）。
2. **Given** 用户在任意位置，**When** 抬头查看导航，**Then** 始终可触达 Contact 入口（导航锚点或固定 CTA）。

---

### User Story 5 — 沉浸式可选交互（手势 / 摄像头） (Priority: P3)

技术同行额外探索时，可启用高级交互（如 webcam 手势追踪驱动视觉响应），强化“AI Builder” 标签。

**Why this priority**: 锦上添花，但绝不能阻塞主流程；任何浏览器 / 设备 / 权限拒绝场景下网站必须照常工作。

**Independent Test**: 在拒绝摄像头权限的浏览器、不支持 getUserMedia 的浏览器、移动端三个环境中，主流程功能完全可用且无报错。

**Acceptance Scenarios**:

1. **Given** 用户主动点击 “启用沉浸模式 / Enable Immersive”，**When** 浏览器请求摄像头权限并被授予，**Then** 首屏视觉主体由手势 / 头部位置驱动；功能可随时一键关闭。
2. **Given** 用户拒绝摄像头权限或浏览器不支持，**When** 启用沉浸模式失败，**Then** 系统静默回退到鼠标驱动模式，并以非阻塞提示告知用户原因，**不**反复弹窗。

---

### Edge Cases

- 低端设备 / 低帧率：视觉主体应在检测到帧率持续低于 30fps 时自动降级（粒子数量减少 / 关闭后处理 / 切换静态背景）。
- 用户开启系统级 `prefers-reduced-motion`：所有非必要动效降为淡入淡出或直接关闭。
- 网络极慢：首屏关键文字与导航在 LCP 之前必须可见，不依赖 3D 资源加载完成。
- 屏幕宽度极窄（< 360px）或极宽（> 2560px）：布局不破版，留白与字号自适应。
- 键盘 / 屏幕阅读器用户：所有 section 可通过 Tab 顺序访问，可交互元素具备可访问名称。
- 摄像头被其他应用占用：沉浸模式启用失败时给出清晰说明，不卡死页面。
- 用户在 hero 区域长时间停留 / 离开标签页：动画暂停 / 节流，避免 CPU 持续高占用。

---

## 3. Requirements _(mandatory)_

### 3.1 Functional Requirements

#### Information Architecture

- **FR-001**: 站点 MUST 包含且仅包含以下七个一级 section，按此顺序排列：Hero、About / Identity、Capability Map、Featured Projects、Methodology、Writing / Thinking、Contact。
- **FR-002**: 站点 MUST 提供持久可见的导航（顶部固定栏或侧边索引），允许用户一键跳转至任意 section。
- **FR-003**: 每个 section MUST 拥有稳定的 URL 锚点，刷新或外链跳转后能定位到对应位置。

#### Hero

- **FR-010**: Hero MUST 在首屏内同时展示：站主姓名、身份标题、一句定位文案（默认占位：“Designing AI systems that think, decide, and execute.”）、一个持续运行的可交互视觉主体。
- **FR-011**: Hero 视觉主体 MUST 对鼠标 / 触摸位置作出可感知响应，响应延迟 ≤ 100ms。
- **FR-012**: Hero MUST 提供 fallback：在 WebGL 不可用、`prefers-reduced-motion` 启用、或低帧率检测触发时，自动切换到轻量 CSS / SVG 动效版本，且姓名、标题、文案保持完全可读。

#### Identity / About

- **FR-020**: About section MUST 用不超过 3 段文字介绍站主身份，强调 “AI 产品经理 + Builder” 复合定位，禁止使用空洞形容词堆砌。

#### Capability Map

- **FR-030**: Capability Map MUST 视觉化呈现 6 项能力：RAG、Multi-Agent、Workflow Design、Evaluation & Bad Case Analysis、AI Coding、Insurance AI Applications。
- **FR-031**: 每项能力 MUST 支持 hover / tap 揭示一句话说明，桌面与移动端均可用。

#### Featured Projects

- **FR-040**: Featured Projects MUST 展示 3–4 个项目卡片，覆盖：智能客服、AI 核保、营销内容生成、Agent 工作流 / Skills 沉淀。
- **FR-041**: 每张项目卡片 MUST 包含：项目名、简介、角色职责、价值结果，且全部字段为内容占位符，便于站主后续替换。
- **FR-042**: 项目卡片 hover 状态 MUST 提供至少两个层级的动效（例如：底层光晕 + 上层文字位移），而非简单 scale。

#### Methodology

- **FR-050**: Methodology MUST 以**带顺序感**的视觉结构（时间线 / 编号流程 / 阶梯模块之一）展示 6 步：Problem Framing、Workflow Decomposition、Evaluation Loop、Bad Case Attribution、Strategy Refinement、Skill / Productization。

#### Writing / Thinking

- **FR-060**: Writing section MUST 以模块卡形式展示至少 3 篇占位文章，每张包含标题、主题标签、摘要、外链占位。

#### Contact

- **FR-070**: Contact section MUST 提供邮箱、GitHub 链接，并预留至少一个额外渠道占位（如 X / LinkedIn / 微信公众号）。
- **FR-071**: 主 CTA 按钮 MUST 视觉醒目但克制（无大面积渐变 / 霓虹），并具备 hover / focus 可访问态。

#### Interaction & Motion

- **FR-080**: 全站滚动 MUST 顺滑，不强制使用自定义滚动劫持；任何 section 的 reveal 动效 MUST 在元素进入视口时触发，且总时长 ≤ 600ms。
- **FR-081**: 鼠标移动 MUST 至少驱动一项全局轻量响应（光标光晕 / 视差 / hero 主体联动），但 MUST NOT 阻塞滚动或文字选择。
- **FR-082**: 站点 MUST 检测并尊重 `prefers-reduced-motion`，触发时关闭粒子、视差与非必要 transition。

#### Optional Immersive Mode

- **FR-090**: 沉浸式（webcam / 手势）交互 MUST 默认关闭，仅通过显式按钮启用。
- **FR-091**: 沉浸模式 MUST 在权限拒绝、API 不支持、设备无摄像头任一情况下静默退化到鼠标交互，且不反复弹窗。
- **FR-092**: 沉浸模式 MUST 提供一键关闭入口，关闭后立即释放摄像头资源。

#### Accessibility & Responsiveness

- **FR-100**: 全部交互元素 MUST 可通过键盘访问，具备可见 focus 态。
- **FR-101**: 关键文字与背景 MUST 满足 WCAG AA 对比度（≥ 4.5:1），允许装饰性发光不计入。
- **FR-102**: 站点 MUST 在 360px – 2560px 宽度区间内不破版，移动 / 平板 / 桌面布局均经过明确设计而非简单缩放。

#### Performance

- **FR-110**: 首屏关键内容（姓名、身份标题、定位文案、导航）MUST 在 3D / 重资源加载完成前即可见。
- **FR-111**: 站点 MUST 在桌面端中端硬件保持 ≥ 50fps；检测到持续低于 30fps 时 MUST 自动降级视觉主体。

#### Content & Branding

- **FR-120** (rev. 4, 2026-05-07): 全部正文文案 MUST 使用简体中文占位文本（zh-Hans），保留 §"Localization Pivot" 列出的四类英文层作为视觉节奏；所有内容 MUST 标记为占位以便站主后续替换。
- **FR-121**: 站点 MUST NOT 使用参考站（Shoya Kajita Portfolio）的具体文案、图像、品牌色块、标志性布局结构。

### 3.2 Key Entities

- **Profile**：站主基础身份（姓名、标题、定位文案、社交链接）。
- **Capability**：能力项（名称、一句话描述、视觉权重 / 分类）。
- **Project**：项目案例（名称、简介、角色、价值结果、可选外链）。
- **MethodologyStep**：方法论步骤（序号、名称、说明）。
- **WritingEntry**：文章 / 思考条目（标题、标签、摘要、外链）。
- **ContactChannel**：联系渠道（类型、标签、URL / 值）。

---

## 4. Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 首屏在标准家用宽带（50 Mbps）+ 中端设备上的 LCP ≤ 2.5s。
- **SC-002**: 首屏关键文字（姓名 + 身份 + 定位文案）在 1.5s 内可读，独立于 3D / 视觉主体加载状态。
- **SC-003**: 5 位无背景陌生测试者，10 秒内能正确复述站主身份方向（AI 产品 / AI Builder / 大模型）的比例 ≥ 80%。
- **SC-004**: 5 位测试者在 60 秒内能说出至少 3 项能力域和 2 个项目案例及其价值结果。
- **SC-005**: 在 360px – 2560px 宽度区间内手动 / 自动测试，0 处布局破版、0 处文字截断遮挡。
- **SC-006**: Lighthouse 桌面性能分 ≥ 85，可访问性分 ≥ 95；移动性能分 ≥ 75。
- **SC-007**: 关闭 JavaScript / WebGL / 摄像头权限三种降级场景下，站点核心信息（七个 section 全部文本）均可访问。
- **SC-008**: 启用 `prefers-reduced-motion` 时，所有装饰性动效关闭，且无视觉破碎。
- **SC-009**: 沉浸模式（如实现）在权限拒绝场景下 0 弹窗轰炸、0 报错阻塞，回退路径 100% 成功。
- **SC-010**: 全站 0 处使用参考站 Shoya Kajita Portfolio 的具体文案 / 图像 / 标志性布局元素（人工对照检查）。

---

## 5. Out of Scope

- 后端 / 数据库 / 用户登录系统
- 文章正文托管（仅外链占位）
- CMS 集成
- 多语言（首版仅英文 + 必要中文标识）
- 评论 / 留言 / 表单提交（Contact 仅展示渠道，不收集表单）

---

## 6. Assumptions

- 站主将后续提供真实文案、项目数据、文章链接，首版以占位英文上线。
- 站点为静态部署（CDN / 静态托管），无服务端渲染必需场景。
- 目标访客以技术 / 产品 / 招聘背景为主，能接受英文为主的界面。

---

> **Addendum (2026-05-07)**: 自第 7 章起为补充增强内容，用于约束视觉一致性、工程结构、Hero 表达、动效层级、实现优先级与反模式。原 §1–§6 不变。本 SDD 在此处**有意降一层抽象**，将部分实现指引（颜色 token、目录结构、占位文案、阶段拆分）写入规格，作为对实现方的强约束；这是站主明确选择，非 SDD 默认做法。`plan.md` 在生成时 MUST 与这些约束保持一致，不得自行替换。

> **Hero Pivot (2026-05-07, rev. 3)**: §9.2 增加 **Option D — Cinematic Typography Wall** 并设为新默认（FR-170 修订）。原因：Phase 1 实测显示 Agent Node System 偏 dashboard 感，与"Digital Experimental Lab"主题的克制气质冲突，且与 Shoya Kajita 风格并未形成有效区隔。Option D 走零-3D / 超大排版 / 极简光带路线，转向 *cinematic studio* 气质。`plan.md` D2 决策同步修订（移除 R3F 作为 Hero 必需依赖），`research.md` R2 增 R2-rev 注记。

> **Localization Pivot (2026-05-07, rev. 4)**: §5 (Out of Scope) 原列"多语言（首版仅英文 + 必要中文标识）"被站主显式推翻。首版正文 MUST 为简体中文（zh-Hans），保留如下英文层作为视觉节奏：(1) 全部 mono 标签（eyebrow `0X — Name`、Hero meta strip、ticker 序号、卡片 `Case · 0X` / 模式串等）；(2) Hero 大字主体（站主拉丁名作 display 主体，Bricolage Grotesque 渲染）；(3) 技术 / 产品域名词（RAG / Multi-Agent / Workflow / Evaluation / AI Coding / Insurance AI 等）；(4) 品牌身份术语（AI Native Builder）。FR-120 同步修订：占位文案改为简体中文；display 字体链增加 PingFang SC / HarmonyOS Sans SC / Microsoft YaHei 系统字体回退（无新增网络字体资源）；`<html lang>` 改为 `zh-Hans`；OG locale 设 `zh_CN`。本修订为正文翻译 + 字体回退，不改变信息架构、不改动 `data/*` 契约 schema（仅替换字符串内容）。

---

## 7. Visual Design System

为避免“每个 section 都很炫但整体不统一”，必须建立统一设计系统。所有页面、组件、动效、交互 MUST 服从以下 design tokens。

### 7.1 Color Tokens

深色、高级、克制的未来感色彩体系。**禁止**大面积廉价霓虹 / 俗套赛博朋克。

```ts
export const colors = {
  backgroundPrimary:   "#05070D",
  backgroundSecondary: "#090D18",
  backgroundElevated:  "#0E1424",

  surfaceGlass:       "rgba(255, 255, 255, 0.06)",
  surfaceGlassStrong: "rgba(255, 255, 255, 0.10)",

  borderSubtle: "rgba(255, 255, 255, 0.12)",
  borderActive: "rgba(69, 230, 255, 0.45)",

  textPrimary:   "#F5F7FA",
  textSecondary: "#A8B3C7",
  textMuted:     "#6F7A91",

  accentCyan:   "#45E6FF",
  accentViolet: "#8B5CFF",
  accentBlue:   "#3B82F6",
  accentGreen:  "#5FFFB1",

  danger: "#FF6B8A",
}
```

### 7.2 Color Usage Rules

- **FR-130**: Background Primary MUST 用于全站基础背景；Background Secondary / Elevated 用于 section / 卡片层级。
- **FR-131**: Accent Cyan MUST 作为主要交互高亮色；Accent Violet 作为空间深度 / 光晕辅助色；Accent Blue 用于链接与导航 active 态。
- **FR-132**: 不允许大面积渐变背景；发光效果 MUST 克制、不影响文字可读性。
- **FR-133**: 关键文字对比度 MUST ≥ 4.5:1（WCAG AA）。

### 7.3 Typography

字体优先级：Inter / Geist / Space Grotesk / Satoshi / Manrope（任选其一为主，最多 2 种）。

```ts
export const typography = {
  heroTitle:     "64–96px desktop / 40–52px mobile",
  heroSubtitle:  "22–28px desktop / 18–22px mobile",
  sectionTitle:  "36–48px desktop / 28–34px mobile",
  cardTitle:     "20–26px",
  body:          "16–18px",
  caption:       "12–14px",
}
```

### 7.4 Typography Rules

- **FR-140**: Hero 标题 MUST 有强视觉冲击，但 MUST NOT 遮挡视觉主体或定位文案。
- **FR-141**: Section Title 节奏 MUST 全站统一。
- **FR-142**: 正文行高 MUST 在 1.6–1.8 区间；最多使用 2 种字体。
- **FR-143**: 项目 / 文章正文 MUST 以可读性优先，不得为视觉牺牲阅读。

### 7.5 Spacing System

```ts
export const spacing = {
  sectionYDesktop:    "96–140px",
  sectionYMobile:     "64–88px",
  containerMaxWidth:  "1200–1320px",
  cardPaddingDesktop: "24–32px",
  cardPaddingMobile:  "18–24px",
  gridGap:            "20–32px",
}
```

### 7.6 Layout Rules

- **FR-150**: 全站最大内容宽度 MUST 在 1200–1320px。
- **FR-151**: Hero MAY 突破常规容器，但关键文字 MUST 在安全区内。
- **FR-152**: 每个 section MUST 有清晰的视觉边界与节奏，禁止全部做成同样的卡片墙。

---

## 8. Component Architecture

### 8.1 Required File Structure

```
src/
  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      About.tsx
      CapabilityMap.tsx
      FeaturedProjects.tsx
      Methodology.tsx
      Writing.tsx
      Contact.tsx
    visuals/
      InteractiveOrb.tsx
      AgentNodeGraph.tsx
      ControlRoomGrid.tsx
      CursorGlow.tsx
      BackgroundField.tsx
    ui/
      SectionHeader.tsx
      GlassCard.tsx
      MagneticButton.tsx
      Tag.tsx
      Reveal.tsx
      ExternalLink.tsx

  data/
    profile.ts
    capabilities.ts
    projects.ts
    methodology.ts
    writing.ts
    contact.ts

  hooks/
    useReducedMotion.ts
    useMousePosition.ts
    usePerformanceMode.ts
    useIsMobile.ts

  lib/
    cn.ts
    constants.ts
```

### 8.2 Component Rules

- **FR-160**: 每个 section MUST 拆为独立组件，禁止单文件实现整页。
- **FR-161**: 所有展示内容 MUST 从 `data/*` 读取，禁止在 JSX 中硬编码姓名 / 项目名 / 能力 / 文章。
- **FR-162**: Hero 视觉主体 MUST 拆为独立 visual component。
- **FR-163**: scroll reveal MUST 抽象为 `Reveal` 组件，禁止每个 section 重写一套。
- **FR-164**: 通用卡片 MUST 使用 `GlassCard`；按钮 MUST 使用 `MagneticButton` 或同等抽象。
- **FR-165**: 导航锚点 MUST 与 section id 一一对应。
- **FR-166**: 所有组件 MUST 支持移动端。

---

## 9. Hero Visual Concept

### 9.1 Hero Goal

Hero 同时承担三件事：**Wow Effect + 身份识别 + 主题表达（Digital Experimental Lab / AI Agent Control Room）**。

### 9.2 Hero Visual Options（四选一）

- **Option A — Agent Node System**：发光节点悬浮深色空间，节点细线连接代表运行中的 Agent 网络；每节点对应一项能力；鼠标驱动视差、连线强弱、发光强度；hover 节点出 tooltip。运动 MUST 缓慢克制，**禁止**做成普通粒子背景。
- **Option B — Digital Lab Orb**：中央交互 orb + 周围漂浮模块标签；鼠标驱动形变 / 光晕 / 视差。性能保守版本。
- **Option C — Control Room Grid**：层叠深色面板 + 动态信号线 + 浮动标签；装饰为主，**禁止**做成普通 SaaS dashboard。
- **Option D — Cinematic Typography Wall（默认，2026-05-07 修订）**：零 3D。整屏由超大 display 排版主导（站主名字 14–18vw / 副标题 4–6vw）。无画布、无节点、无 dashboard 装饰。背景为基础深色 + 极淡 noise + 远景柔和发光。鼠标驱动一根 1px 细光带（或同等克制的指针指示）。文案在 viewport 主轴居中或左对齐。适合追求 *high-end studio / cinematic* 气质、最小化炫技、最优 LCP 的方向。**禁止**为了视觉效果牺牲可读性；副文案 MUST 与名字层级清晰区分。

### 9.3 Default Choice

- **FR-170**: Hero 视觉主体 MUST 默认实现 **Option D — Cinematic Typography Wall**。当站主在未来通过显式 spec 修订改回时，方可使用 Option A / B / C。**禁止**默认使用普通粒子背景。
- **FR-170-NOTE**: Option D 不依赖 WebGL，因此 FR-012 / FR-174 中的"WebGL fallback"对 Hero 视觉主体不再适用；fallback 仅适用于次级装饰动效（如鼠标光带、scroll-driven reveal）。
- **FR-170-CAP**: 原 Option A 的 Agent Node Graph 概念**保留**为 Capability Map section（§3.1 FR-030/031）的视觉锚点候选（Phase 3 工作），不再作为 Hero 主体。

### 9.4 Hero Required Content（占位）

- Name: `Yao Xin`
- Title: `AI Product Manager / AI Native Builder`
- Tagline: `Designing AI systems that think, decide, and execute.`
- Subline: `I build AI-native products across RAG, multi-agent workflows, evaluation loops, and industry-grade automation.`
- Primary CTA: `Explore My Work`
- Secondary CTA: `View Methodology`

### 9.5 Hero Layout Rules

- **FR-171**: Hero MUST 形成清晰的空间层级。在 Option D 下，名字 MUST 是首屏视觉主体（占据视觉重心 ≥ 40% 高度），副标题、tagline、CTA 形成下行节奏；**禁止**简单上下堆叠成"标题 + 段落"形态。
- **FR-172**: 移动端 MUST 优先保证文案可读，名字字号自动收敛但仍占视觉重心。
- **FR-173**: 任何装饰元素（光带、noise、远景光斑）MUST NOT 遮挡 name / 副标题 / tagline。
- **FR-174**: 任何依赖 WebGL / Canvas 的次级装饰未加载时，Hero 文字 MUST 先展示。Option D 下 Hero 主体本身不依赖 WebGL，本规则改约束次级装饰。
- **FR-175**: Hero 首屏建议 100svh（safe-area-aware），MUST NOT 因固定高度导致移动端溢出或滚动条出现。

---

## 10. Placeholder Copy

### 10.1 Profile

```ts
export const profile = {
  name: "Yao Xin",
  title: "AI Product Manager / AI Native Builder",
  tagline: "Designing AI systems that think, decide, and execute.",
  subline:
    "I build AI-native products across RAG, multi-agent workflows, evaluation loops, and industry-grade automation.",
  location: "Shanghai / Remote",
  email: "replace-with-your-email@example.com",
  github: "https://github.com/replace-me",
}
```

### 10.2 About

```ts
export const about = [
  "I work at the intersection of product strategy, AI system design, and builder-level execution. My focus is turning ambiguous business problems into structured AI workflows that can be evaluated, improved, and shipped.",
  "Unlike traditional product portfolios, this site is designed as a digital lab. Each section maps a part of my AI product practice, from problem framing to agent orchestration and skill productization.",
  "My work spans RAG systems, multi-agent workflows, evaluation loops, AI coding practices, and B2B insurance AI applications.",
]
```

### 10.3 Capabilities

```ts
export const capabilities = [
  { name: "RAG",             description: "Designing retrieval-augmented systems that connect domain knowledge with reliable generation.", visualWeight: "core" },
  { name: "Multi-Agent",     description: "Structuring specialized agents around clear roles, tools, memory, and handoff logic.",          visualWeight: "core" },
  { name: "Workflow Design", description: "Turning business processes into observable, controllable AI execution flows.",                  visualWeight: "core" },
  { name: "Evaluation Loop", description: "Building quality loops through test sets, bad case analysis, regression checks, and refinement.", visualWeight: "supporting" },
  { name: "AI Coding",       description: "Using Claude Code, Codex, Windsurf, and AI-first tooling to accelerate prototyping and delivery.", visualWeight: "supporting" },
  { name: "Insurance AI",    description: "Applying large-model systems to customer service, underwriting, marketing, and sales enablement.", visualWeight: "domain" },
]
```

### 10.4 Methodology

```ts
export const methodology = [
  { step: "01", title: "Problem Framing",        description: "Clarify the business problem, user context, decision boundaries, and expected value before designing the AI workflow." },
  { step: "02", title: "Workflow Decomposition", description: "Break complex AI tasks into observable steps with clear inputs, outputs, and failure modes." },
  { step: "03", title: "Evaluation Loop",        description: "Define test sets, metrics, acceptance criteria, and regression checks before scaling the solution." },
  { step: "04", title: "Bad Case Attribution",   description: "Trace failures back to retrieval, reasoning, prompt design, tool use, data quality, or product constraints." },
  { step: "05", title: "Strategy Refinement",    description: "Improve prompts, workflows, tools, memory, routing logic, and human review policies based on evidence." },
  { step: "06", title: "Skill / Productization", description: "Turn repeated patterns into reusable skills, templates, workflows, and productized operating methods." },
]
```

---

## 11. Project Card Content Model

### 11.1 Required Structure

每张项目卡片 MUST 包含：Project Name / Category Tag / One-line Problem / What I Designed / AI System Pattern / Business Impact (placeholder) / Role / Visual Accent。

### 11.2 Project Data（占位）

```ts
export const projects = [
  {
    name: "AI Customer Service Agent",
    category: "Insurance AI / Customer Support",
    problem:  "Traditional customer service workflows struggled with repetitive inquiries, fragmented knowledge, and inconsistent response quality.",
    designed: "Designed an AI-assisted customer service workflow combining intent recognition, retrieval, response generation, and human escalation.",
    pattern:  "RAG + Workflow Orchestration + Human-in-the-loop Review",
    role:     "Product workflow design, knowledge structure, evaluation loop, and bad case analysis.",
    impact:   "Placeholder for response efficiency, quality improvement, or coverage expansion.",
    accent:   "cyan",
  },
  {
    name: "AI Underwriting Decision Chain",
    category: "Insurance AI / Decision Workflow",
    problem:  "Legacy rule-based underwriting struggled with long medical records, multi-source materials, and complex disease reasoning.",
    designed: "Designed a layered workflow from material parsing to field extraction, disease deduplication, code mapping, and underwriting reasoning.",
    pattern:  "Document Parsing + Information Extraction + Rule Reasoning + Human Review",
    role:     "Layered decision chain design, evaluation criteria, workflow boundary definition, and reasoning process structuring.",
    impact:   "Placeholder for accuracy improvement, processing efficiency, or review reduction.",
    accent:   "violet",
  },
  {
    name: "AI Marketing Content Workflow",
    category: "Insurance AI / Marketing Enablement",
    problem:  "Sales teams needed faster and more consistent generation of compliant, scenario-based marketing content.",
    designed: "Designed a structured content generation workflow with scenario templates, brand constraints, review logic, and reusable prompt patterns.",
    pattern:  "Prompt Workflow + Content Template + Review Loop",
    role:     "Product logic design, scenario decomposition, content workflow design, and quality control.",
    impact:   "Placeholder for content production efficiency, adoption rate, or sales enablement value.",
    accent:   "blue",
  },
  {
    name: "Agent Workflow & Skills System",
    category: "AI Native Builder / Workflow System",
    problem:  "Repeated AI tasks were difficult to standardize, evaluate, and reuse across different product scenarios.",
    designed: "Built a reusable workflow and skills methodology to transform repeated AI work into structured, executable patterns.",
    pattern:  "Agent Workflow + Skills + Evaluation + Iteration Loop",
    role:     "AI workflow design, skill abstraction, tool usage strategy, and builder methodology development.",
    impact:   "Placeholder for prototype speed, delivery efficiency, or workflow reuse.",
    accent:   "green",
  },
]
```

### 11.3 Interaction Rules

- **FR-180**: Hover MUST NOT 仅有 scale；MUST 至少包含两个层级动效（底层光晕 / 边框 + 上层文字位移 / 标签激活 / 背景层次）。
- **FR-181**: 移动端 MUST 改为 tap 展开详情。
- **FR-182**: 卡片信息层级 MUST 体现「问题 → 设计 → 系统模式 → 价值」。

---

## 12. Motion Design Rules

### 12.1 Motion Levels

- **Level 1 — Ambient Motion**：节点漂移 / 网格呼吸 / 光斑缓动 / Hero 视觉深度变化。MUST NOT 闪烁、MUST NOT 高频运动、MUST NOT 影响阅读；`prefers-reduced-motion` 启用时 MUST 关闭。
- **Level 2 — Interaction Feedback**：鼠标视差 / hover 边框发光 / 按钮 magnetic / 节点 hover tooltip / 卡片层级位移。反馈 MUST ≤ 100ms；MUST NOT 阻塞滚动 / 文本选择；移动端 MUST 改为 tap。
- **Level 3 — Narrative Reveal**：section 标题淡入 / stagger reveal / Methodology 顺序出现 / Capability 节点逐个激活。reveal 总时长 MUST ≤ 600ms；MUST NOT 滚动劫持；MUST NOT 让用户等动画结束才能阅读。

### 12.2 Anti-Rules

- **FR-190**: 禁止：大量元素同时闪烁、高频旋转、过度弹跳、过度霓虹、滚动劫持、引发 layout shift 的动画、遮挡正文的动画、与 AI Agent Control Room 主题无关的炫技动效。

---

## 13. Implementation Phases

### Phase 1 — Foundation

项目骨架 / 全局 layout / 颜色字体间距 token / Navbar+Footer / 七个 section（静态数据驱动）/ 锚点 / 移动端基础适配。

### Phase 2 — Hero Wow Effect

Agent Node System（或 Lab Orb）/ 鼠标响应 / Hero 文字先于视觉展示 / WebGL fallback / reduced-motion 关闭复杂动画 / 移动端可读。

### Phase 3 — Section Interactions

Capability hover-tap / Project 分层 hover / Methodology 顺序 reveal / Writing 卡片态 / Contact CTA 态 / CursorGlow 全局轻量响应。

### Phase 4 — Performance & Accessibility

reduced-motion / low-FPS degradation / 重型 visual lazy-load / 键盘导航 / focus 可见 / 资源优化 / Lighthouse 达标 / 无 console error。

### Phase 5 — Optional Immersive Mode（可选）

Webcam / hand tracking：默认关闭；显式启用；权限拒绝静默退化；不反复弹窗；一键关闭；关闭后释放摄像头。**核心网站稳定前不实现**。如影响性能，首版可不做。

### Required Implementation Priority

```
Readability > Performance > Coherent Identity > Interaction > WebGL > Webcam / Hand Tracking
```

- **FR-200**: 实现 MUST 按 Phase 1 → 5 顺序推进，前一阶段未达成验收标准前 MUST NOT 进入下一阶段。

---

## 14. Anti-Patterns

### 14.1 Visual

廉价赛博朋克、大面积霓虹渐变、随机粒子背景、与主题无关的 3D、过度玻璃拟态、所有 section 长一样、只有特效没有信息层级、像 SaaS / 简历 / 模板 portfolio。

### 14.2 Interaction

全页滚动劫持、必须等动画完才能浏览、hover 只做 scale、特效阻塞文字选择、动画造成布局抖动、移动端不可用、摄像头默认开启、权限失败反复弹窗。

### 14.3 Engineering

单文件实现整站、内容硬编码、组件无移动端态、WebGL 失败导致页面空白、3D 阻塞首屏文字、无 fallback、无 reduced-motion、无 focus 态、控制台报错、为炫技引入过重依赖。

- **FR-210**: 第 14 章列出的反模式 MUST 全部不出现于交付实现中。

---

## 15. Final QA Checklist

### 15.1 Visual

Hero 3 秒内 wow / 不像简历 / 不像 SaaS / 不像模板 / 视觉语言统一 / 发光克制 / 色彩统一 / 字体层级清晰 / 留白节奏到位 / Hero 服务于 Control Room 主题。

### 15.2 Content

10 秒识别身份 / Capability 6 项明确 / 每项一句话 / Projects 体现「问题→设计→系统模式→价值」/ Methodology 有顺序 / Writing 体现思考沉淀 / Contact 入口清晰。

### 15.3 Engineering

内容已在 `data/*` / section 已拆组件 / visual 已封装 / 全部 anchor 稳定 / Navbar 全可达 / 移动 / 平板 / 超宽屏均检查 / WebGL fallback / reduced-motion / 无 console error / 无明显 layout shift。

### 15.4 Accessibility

键盘可达 / focus 可见 / 关键文字 ≥ 4.5:1 / 装饰元素不干扰屏读 / motion-sensitive 可用 / 移动 tap 目标足够大。

### 15.5 Performance

首屏文字先于 3D / 重型 visual lazy-load / 无明显卡顿 / 低性能自动降级 / Lighthouse 桌面性能 ≥ 85 / a11y ≥ 95 / 移动性能 ≥ 75。

- **FR-220**: 交付前 MUST 完成 §15.1–§15.5 全部清单自检并记录结果。

---

## 16. AI Implementation Instruction

实现本 SDD 时，**产品表达优先于炫技**。这是 AI Builder 的数字实验室，不是创意开发者作品集，也不是产品经理简历页。

所有视觉效果 MUST 强化以下主题之一：

- AI systems are modular.
- Agent workflows are observable.
- Product thinking turns ambiguity into execution.
- Builder capability is proven through projects and methods.
- Complex AI work can be decomposed, evaluated, and productized.

**取舍原则（按优先级）**：

```
readability       >  visual density
performance       >  complexity
coherent identity >  random cool effects
maintainability   >  one-off animation tricks
product clarity   >  pure visual experimentation
```

**最终验收（呼应 §4 Success Criteria）**：

- 第一眼有视觉记忆点。
- 10 秒识别 AI 产品经理 / AI Native Builder 身份（呼应 SC-003）。
- 60 秒理解能力、项目、方法论（呼应 SC-004）。
- 前沿感不牺牲专业表达。
- **不是** Shoya Kajita Portfolio 的复刻，而是同等实验气质下的全新 AI Builder 个人站（呼应 SC-010）。


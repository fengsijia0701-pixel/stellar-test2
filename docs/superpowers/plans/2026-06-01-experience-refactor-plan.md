# 实习经历板块重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重构网站实习经历展示模块，简化 AboutSection、增强 IndustryTimeline、添加自定义光标

**Architecture:** 
- AboutSection 保留个人介绍 + 教育背景，删除7张实习卡片 
- IndustryTimeline 作为唯一实习展示模块，包含时间排序 + Hover弹窗 + 点击详情
- 全局自定义叉耙光标增强 Stardew Valley 风格

**Tech Stack:** Astro 4.x, Tailwind CSS, TypeScript, Vanilla JS

---

## 文件变更清单

### 修改的文件
- `src/components/AboutSection.astro` - 删除实习经历部分
- `src/components/IndustryTimeline.astro` - 增强：时间排序 + Hover弹窗 + 公司数据
- `src/styles/global.css` - 添加自定义光标样式
- `src/pages/index.astro` - 调整组件顺序
- `src/data/timeline.json` - 时间排序调整

---

## Task 1: AboutSection 删除实习经历部分

**Files:**
- Modify: `src/components/AboutSection.astro`
- Reference: `src/components/IndustryTimeline.astro` (保持完整的 ExperienceCard 逻辑)

- [ ] **Step 1: 读取 AboutSection.astro 当前内容**

```bash
cat src/components/AboutSection.astro
```

- [ ] **Step 2: 识别实习经历部分的 HTML 结构**

在 AboutSection.astro 中找到：
```html
<!-- 实习经历 -->
<div class="mt-20">
  <h3 class="font-heading text-2xl font-semibold text-dark mb-8 flex items-center gap-2">
    <span>💼</span> 实习经历
  </h3>
  <!-- Connected Timeline with Icons -->
  <div class="relative">
    ...
  </div>
</div>
```

- [ ] **Step 3: 删除实习经历部分，保留个人介绍 + 教育背景**

删除从 `<!-- 实习经历 -->` 到其结束 `</div>` 的整个区块

修改后结构应为：
```astro
<section id="about" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="font-heading text-4xl font-bold text-dark text-center mb-12">
      关于我
    </h2>

    <div class="grid md:grid-cols-2 gap-12 items-start">
      <!-- 个人介绍 -->
      ...
    </div>

    <!-- 教育背景 -->
    ...
    
    <!-- 删除：实习经历部分 -->
  </div>
</section>
```

- [ ] **Step 4: 构建并验证**

```bash
npm run build
```

- [ ] **Step 5: 提交**

```bash
git add src/components/AboutSection.astro
git commit -m "refactor: remove experience cards from AboutSection"
```

---

## Task 2: IndustryTimeline 时间排序

**Files:**
- Modify: `src/components/IndustryTimeline.astro`
- Modify: `src/data/timeline.json`

- [ ] **Step 1: 读取 timeline.json 确认当前顺序**

```bash
cat src/data/timeline.json | grep -A2 '"company"'
```

- [ ] **Step 2: 在 IndustryTimeline.astro 中按时间排序**

在 JavaScript 部分，按 period 排序：

```javascript
// 按行业分组后，每组内按时间排序（从早到晚）
Object.values(industries).forEach(industry => {
  industry.companies.sort((a, b) => {
    const getStartYear = (period: string) => {
      const start = period.split(' - ')[0];
      return parseInt(start.replace('.', ''));
    };
    return getStartYear(a.period) - getStartYear(b.period);
  });
});
```

**排序结果（每个行业内从早到晚）：**
- 🌐 互联网：哈啰(2025.02) → 美团(2025.05) → 小红书(2025.09) → 字节(2026.01)
- 🏥 医疗健康：默克(2024.05) → 美敦力(2024.09)
- 💼 金融/咨询：安永(2023.12)

- [ ] **Step 3: 构建并验证**

```bash
npm run build
```

- [ ] **Step 4: 提交**

```bash
git add src/components/IndustryTimeline.astro
git commit -m "feat: sort companies by time within each industry"
```

---

## Task 3: IndustryTimeline 添加 Hover 弹窗

**Files:**
- Modify: `src/components/IndustryTimeline.astro`

- [ ] **Step 1: 添加公司介绍数据**

在 JavaScript 部分添加：

```typescript
interface CompanyInfo {
  description: string;
  scale: string;
  position: string;
}

const companyInfo: Record<string, CompanyInfo> = {
  '字节跳动': {
    description: '全球最大短视频平台 TikTok 母公司',
    scale: '市值超 2000 亿美元，员工超 15 万人',
    position: '全球最具价值独角兽之一'
  },
  '小红书': {
    description: '月活 2.6 亿的生活方式分享平台',
    scale: '估值超 200 亿美元',
    position: '国内头部社交电商平台'
  },
  '美团': {
    description: '国内最大本地生活服务平台',
    scale: '年营收超 2000 亿元',
    position: '外卖/酒旅/到店龙头'
  },
  '哈啰': {
    description: '阿里旗下出行科技公司',
    scale: '哈啰单车覆盖超 400 城市',
    position: '共享单车行业头部'
  },
  '美敦力': {
    description: '全球最大医疗器械公司',
    scale: '市值超 1000 亿美元',
    position: '心脏支架/胰岛素泵等领域全球第一'
  },
  '默克': {
    description: '全球领先科技公司',
    scale: '年营收超 200 亿欧元',
    position: '生命科学/医药健康领域龙头'
  },
  '安永': {
    description: '全球四大会计师事务所之一',
    scale: '覆盖 150+ 国家，30 万+ 员工',
    position: '全球顶级审计/咨询机构'
  }
};
```

- [ ] **Step 2: 添加 Hover 弹窗 HTML 结构**

在每个公司卡片上添加 `onmouseenter` 和 `onmouseleave`：

```astro
<div 
  class={`mt-8 p-4 rounded-stardew border-2 ${...} hover:shadow-stardew-lg transition-all duration-300 hover:-translate-y-1 relative`}
  onmouseenter={`showCompanyPopup('${company.company}', event)`}
  onmouseleave="hideCompanyPopup()"
>
  <!-- 公司卡片内容 -->
  ...
</div>
```

添加弹窗容器（在连接线之后）：

```astro
<!-- Hover 弹窗 -->
<div id="company-popup" class="fixed z-50 hidden pointer-events-none">
  <div class="bg-white border-2 border-dark/20 rounded-stardew shadow-stardew p-4 max-w-xs">
    <h4 id="popup-company" class="font-heading font-bold text-dark mb-2"></h4>
    <p id="popup-description" class="text-sm text-dark/70"></p>
    <p id="popup-scale" class="text-xs text-dark/60 mt-2"></p>
    <p id="popup-position" class="text-xs text-secondary font-medium mt-1"></p>
  </div>
</div>
```

- [ ] **Step 3: 添加 JavaScript 函数**

```javascript
let popupTimeout: number;

function showCompanyPopup(companyName: string, event: MouseEvent) {
  const popup = document.getElementById('company-popup');
  const info = companyInfo[companyName];
  
  if (!popup || !info) return;
  
  clearTimeout(popupTimeout);
  
  document.getElementById('popup-company')!.textContent = companyName;
  document.getElementById('popup-description')!.textContent = info.description;
  document.getElementById('popup-scale')!.textContent = info.scale;
  document.getElementById('popup-position')!.textContent = info.position;
  
  popup.classList.remove('hidden');
  
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  popup.style.left = `${rect.left}px`;
  popup.style.top = `${rect.bottom + 10}px`;
}

function hideCompanyPopup() {
  const popup = document.getElementById('company-popup');
  if (popup) {
    popupTimeout = window.setTimeout(() => {
      popup.classList.add('hidden');
    }, 100);
  }
}
```

- [ ] **Step 4: 构建并验证**

```bash
npm run build
```

- [ ] **Step 5: 提交**

```bash
git add src/components/IndustryTimeline.astro
git commit -m "feat: add hover popup for company info"
```

---

## Task 4: 自定义叉耙光标

**Files:**
- Modify: `src/styles/global.css`
- Check: `tailwind.config.mjs` 是否已有自定义光标配置

- [ ] **Step 1: 读取 global.css**

```bash
cat src/styles/global.css
```

- [ ] **Step 2: 添加自定义光标 CSS**

```css
/* 自定义叉耙光标 - Stardew Valley 风格 */
html {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text y="24" font-size="24">🌾</text></svg>') 4 28, auto;
}

/* 可点击元素的悬停效果 */
a:hover, button:hover, [role="button"]:hover, 
.clickable:hover, .card-hover:hover,
.project-card:hover, .experience-card:hover {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text y="24" font-size="24">👆</text></svg>') 4 28, auto;
}

/* 输入框保持文本光标 */
input, textarea, [contenteditable="true"] {
  cursor: text;
}
```

**备选方案（纯 SVG 叉耙）：**

```css
/* 叉耙形状光标 */
html {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23a5b5bc" d="M7 2v4H5V2H3v6h2v2H3v6h2v-2h2v2h2v-2h2v-2h2v-2h2V8h2V2h-2v4h-2V2h-2z"/><path fill="%239b4e40" d="M11 0h2v2h-2z"/></svg>') 12 12, auto;
}
```

- [ ] **Step 3: 在 BaseLayout.astro 中引入 global.css**

检查是否已有：
```astro
---
import '../styles/global.css';
---
```

如果没有，添加。

- [ ] **Step 4: 构建并验证**

```bash
npm run build
```

- [ ] **Step 5: 提交**

```bash
git add src/styles/global.css
git commit -m "feat: add custom fork cursor for Stardew Valley style"
```

---

## Task 5: 完整集成测试

**Files:**
- Test: `src/pages/index.astro`

- [ ] **Step 1: 确认页面结构正确**

页面应包含：
```astro
<main>
  <HeroSection />
  <AboutSection />           <!-- 已精简 -->
  <IndustryTimeline />       <!-- 已增强 -->
  <StatsBanner />
  <WhyChooseMe />
  <ProjectsSection />
  <SkillsSection />
  <ContactSection />
</main>
```

- [ ] **Step 2: 构建并本地预览**

```bash
npm run build
npm run preview
```

- [ ] **Step 3: 检查验收标准**

对照 `docs/superpowers/specs/2026-06-01-experience-refactor-design.md` 第9节：

- [ ] AboutSection "我是谁"介绍保留
- [ ] AboutSection 教育背景时间线保留
- [ ] AboutSection 7张实习经历卡片已删除
- [ ] IndustryTimeline 每个行业内按时间排序（从早到晚）
- [ ] IndustryTimeline Hover 公司名称显示中等弹窗
- [ ] IndustryTimeline 点击公司卡片显示详情滑出面板
- [ ] 光标使用叉耙/手型光标
- [ ] 页面正常加载，无报错

- [ ] **Step 4: 提交最终变更**

```bash
git add .
git commit -m "feat: complete experience refactor - simplified AboutSection, enhanced IndustryTimeline, custom cursor

- Remove experience cards from AboutSection (kept personal intro + education)
- IndustryTimeline: sort by time within each industry
- IndustryTimeline: add hover popup with company info (description/scale/position)
- Add custom fork cursor for Stardew Valley theme"
git push
```

---

## 执行顺序

1. **Task 1** - AboutSection 删除实习经历部分
2. **Task 2** - IndustryTimeline 时间排序
3. **Task 3** - IndustryTimeline Hover 弹窗
4. **Task 4** - 自定义叉耙光标
5. **Task 5** - 完整集成测试

每个 Task 完成后进行构建验证，全部完成后统一 commit + push。

---

*本计划由 Claude Code 生成，2026-06-01*
*基于设计文档：docs/superpowers/specs/2026-06-01-experience-refactor-design.md*

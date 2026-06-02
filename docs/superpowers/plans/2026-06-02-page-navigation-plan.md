# 页面导航与弹窗实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现新的页面导航结构：删除 page-experience，在成长轨迹添加公司详情弹窗，调整左右箭头显示逻辑，在分支页面添加返回地图按钮

**Architecture:** 
- 页面导航使用 PageNavigator 类管理，当前页面 ID 在动画完成后更新
- 公司详情弹窗使用固定定位 overlay + 卡片，点击外部关闭
- 小地图页面动态隐藏右箭头

**Tech Stack:** Astro, Vanilla JS, CSS animations

---

## 文件清单

| 文件 | 职责 |
|------|------|
| `src/pages/index.astro` | 主页面结构、导航逻辑、PageNavigator 类 |
| `src/components/GrowthTrackSection.astro` | 成长轨迹组件（添加弹窗功能） |
| `src/components/RPGMapSection.astro` | 小地图组件（隐藏右箭头） |

---

## Task 1: 删除 page-experience 页面

**Files:**
- Modify: `src/pages/index.astro:70-73` (删除 page-experience section)

- [ ] **Step 1: 删除 page-experience section**

找到并删除以下代码：
```html
<section id="page-experience" class="page" data-lock-scroll="true">
  <ExperienceDetail />
</section>
```

- [ ] **Step 2: 从页面顺序数组中移除 page-experience**

修改 `pageOrder` 数组，删除 `'page-experience'`

修改 `pages` 数组，删除 `'page-experience'`

- [ ] **Step 3: 删除 ExperienceDetail import**

删除: `import ExperienceDetail from '../components/ExperienceDetail.astro';`

- [ ] **Step 4: 验证构建**

Run: `cd /c/Users/冯思佳/personal-website && npm run build`
Expected: Build Complete!

- [ ] **Step 5: 提交**

```bash
git add -A && git commit -m "feat: remove page-experience, now using popup instead"
```

---

## Task 2: 修复小地图页面右箭头隐藏

**Files:**
- Modify: `src/pages/index.astro` (添加右箭头隐藏逻辑)

- [ ] **Step 1: 在 updateNavButtonsFromPageId 函数中添加右箭头隐藏逻辑**

找到 `updateNavButtonsFromPageId` 函数，添加：
```javascript
// Hide right arrow on map page
const rightArrow = document.querySelector('.nav-arrow-btn.right');
if (rightArrow) {
  rightArrow.style.display = currentId === 'page-map' ? 'none' : 'flex';
}
```

- [ ] **Step 2: 验证修改后构建**

Run: `npm run build`
Expected: Build Complete!

- [ ] **Step 3: 提交**

```bash
git add -A && git commit -m "feat: hide right arrow on map page"
```

---

## Task 3: 分支页面添加"返回地图"按钮

**Files:**
- Modify: `src/components/ProjectsSpace.astro`
- Modify: `src/components/ProjectsExperience.astro`
- Modify: `src/components/CompetitionsSection.astro`
- Modify: `src/components/SkillsSection.astro`
- Modify: `src/components/ContactSection.astro`

- [ ] **Step 1: 在 ProjectsSpace.astro 添加返回按钮**

在 `.nav-bar` 或页面底部添加：
```html
<div class="nav-bar">
  <button class="wood-btn" onclick="pageNavigator.goTo('page-map')">◀ 返回地图</button>
</div>
```

- [ ] **Step 2: 在其他分支页面添加相同按钮**

对以下文件重复 Step 1：
- ProjectsExperience.astro
- CompetitionsSection.astro
- SkillsSection.astro
- ContactSection.astro

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: Build Complete!

- [ ] **Step 4: 提交**

```bash
git add -A && git commit -m "feat: add back-to-map button on all branch pages"
```

---

## Task 4: 成长轨迹添加公司详情弹窗

**Files:**
- Modify: `src/components/GrowthTrackSection.astro` (主要修改)
- Modify: `src/pages/index.astro` (添加公司数据)

- [ ] **Step 1: 在 index.astro 中添加公司详情数据**

在 `<script>` 标签内添加公司数据对象：
```javascript
const companyDetails = {
  'bytedance': {
    icon: '🌐',
    name: '字节跳动 TikTok',
    role: '印尼电商策略实习生',
    period: '2026.01 - 2026.04',
    brief: '主导斋月大促，Fashion GMV +52%',
    projects: ['斋月大促策略', '精细预算优化', '头达撮合策略']
  },
  'xiaohongshu': {
    icon: '📕',
    name: '小红书',
    role: '商业产品实习生',
    period: '2025.09 - 2025.12',
    brief: 'AIGC笔记内测，ROI +176%',
    projects: ['AIGC笔记内测', '大促单品优化', '新商投放冷启']
  },
  // ... 其他公司
};
```

- [ ] **Step 2: 在 GrowthTrackSection.astro 中添加弹窗 HTML 结构**

在组件底部添加：
```html
<!-- Company Detail Popup Overlay -->
<div id="company-popup-overlay" class="popup-overlay" style="display: none;">
  <div id="company-popup" class="popup-card">
    <button class="popup-close">✕</button>
    <div class="popup-header">
      <span class="popup-icon"></span>
      <div class="popup-title">
        <h2 class="popup-company"></h2>
        <p class="popup-role"></p>
      </div>
    </div>
    <p class="popup-period"></p>
    <p class="popup-brief"></p>
    <div class="popup-projects">
      <h3>📂 项目详情</h3>
      <ul class="project-list"></ul>
    </div>
  </div>
</div>
```

- [ ] **Step 3: 添加弹窗 CSS 样式**

```css
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.popup-card {
  background: linear-gradient(135deg, var(--color-wood), var(--color-wood-light));
  border: 4px solid var(--color-wood-dark);
  border-radius: 12px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: popupSlideIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popupSlideIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-wood-dark);
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.popup-icon {
  font-size: 2.5rem;
}

.popup-title h2 {
  font-family: var(--font-game);
  color: var(--color-cream);
  margin: 0;
}

.popup-role {
  font-family: var(--font-game);
  color: var(--color-parchment);
  margin: 5px 0 0 0;
}

.popup-period {
  font-family: var(--font-pixel);
  font-size: 0.7rem;
  color: var(--color-neon-yellow);
  margin-bottom: 10px;
}

.popup-brief {
  font-family: var(--font-game);
  color: var(--color-cream);
  margin-bottom: 20px;
}

.popup-projects h3 {
  font-family: var(--font-game);
  color: var(--color-neon-green);
  margin-bottom: 10px;
}

.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-list li {
  font-family: var(--font-game);
  color: var(--color-parchment);
  padding: 8px 0;
  border-bottom: 1px solid rgba(139, 90, 43, 0.3);
}
```

- [ ] **Step 4: 添加节点点击事件处理**

在 GrowthTrackSection.astro 的 `<script>` 中添加：
```javascript
// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.node[data-company]');
  const overlay = document.getElementById('company-popup-overlay');
  const popup = document.getElementById('company-popup');
  const closeBtn = popup?.querySelector('.popup-close');
  
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const companyId = node.dataset.company;
      const data = companyDetails[companyId];
      if (data && overlay && popup) {
        // 填充数据
        popup.querySelector('.popup-icon').textContent = data.icon;
        popup.querySelector('.popup-company').textContent = data.name;
        popup.querySelector('.popup-role').textContent = data.role;
        popup.querySelector('.popup-period').textContent = data.period;
        popup.querySelector('.popup-brief').textContent = data.brief;
        
        const projectList = popup.querySelector('.project-list');
        projectList.innerHTML = data.projects.map(p => `<li>${p}</li>`).join('');
        
        // 显示弹窗
        overlay.style.display = 'flex';
      }
    });
  });
  
  // 点击关闭按钮
  closeBtn?.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
  
  // 点击外部关闭
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });
});
```

- [ ] **Step 5: 验证构建**

Run: `npm run build`
Expected: Build Complete!

- [ ] **Step 6: 提交**

```bash
git add -A && git commit -m "feat: add company detail popup in growth track"
```

---

## Task 5: 最终验证

**Files:**
- Test: http://localhost:4335

- [ ] **Step 1: 启动预览服务器**

Run: `cd /c/Users/冯思佳/personal-website && npx astro preview --port 4335`

- [ ] **Step 2: 验证导航箭头**

检查：
- page-welcome: ◀ disabled, ▶ enabled
- page-whoami: ◀ enabled, ▶ enabled
- page-growth: ◀ enabled, ▶ enabled
- page-map: ◀ enabled, ▶ hidden

- [ ] **Step 3: 验证返回按钮**

在分支页面（项目空间等）检查是否有"返回地图"按钮

- [ ] **Step 4: 验证公司详情弹窗**

在成长轨迹页面点击公司节点，检查是否显示弹窗

- [ ] **Step 5: 验证弹窗关闭**

点击弹窗外部，检查弹窗是否关闭

- [ ] **Step 6: 提交所有更改**

```bash
git add -A && git commit -m "feat: complete page navigation redesign with popup"
```

---

## 验收标准

- [ ] page-experience 已删除
- [ ] 小地图页面只显示左箭头
- [ ] 分支页面显示"返回地图"按钮
- [ ] 成长轨迹点击公司显示详情弹窗
- [ ] 点击弹窗外部关闭弹窗
- [ ] 页面切换无残留元素

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-02-page-navigation-plan.md`**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

# 页面流程与导航设计 v2.0

> **日期：** 2026-06-02
> **版本：** v2.0
> **主题：** 页面流程优化 + 导航结构重设计
> **状态：** 已确认

---

## 1. 页面结构

### 1.1 页面列表（9个页面）

| # | 页面ID | 名称 | 说明 |
|---|--------|------|------|
| 0 | page-welcome | 你好，我是冯思佳 | 首页入口 |
| 1 | page-whoami | 我是谁 | 个人介绍 |
| 2 | page-growth | 成长轨迹 | 教育背景 + 工作经历（点击公司展开详情） |
| 3 | page-map | 小地图 | RPG风格地图导航枢纽 |
| 4 | page-projects-space | 项目空间 | 项目展示 |
| 5 | page-projects-experience | 项目经历 | 项目详情 |
| 6 | page-competitions | 竞赛经历 | 比赛荣誉 |
| 7 | page-skills | 技能大陆 | 技能展示 |
| 8 | page-contact | 联系中心 | 联系方式 |

### 1.2 已删除页面

| 页面ID | 原因 |
|--------|------|
| page-experience | 经验详情不再使用独立页面，改为成长轨迹内的弹窗展示 |

---

## 2. 导航结构

### 2.1 线性导航页面（◀ ▶ 箭头）

| 页面 | 左箭头 | 右箭头 | 说明 |
|------|--------|--------|------|
| page-welcome | disabled | enabled | 首页，左到头 |
| page-whoami | enabled | enabled | 中间页面 |
| page-growth | enabled | enabled | 中间页面 |
| page-map | enabled | **删除** | 地图是枢纽，右到头 |

### 2.2 分支页面（[返回地图] 按钮）

| 页面 | 返回按钮 | 目标 |
|------|----------|------|
| page-projects-space | [返回地图] | page-map |
| page-projects-experience | [返回地图] | page-map |
| page-competitions | [返回地图] | page-map |
| page-skills | [返回地图] | page-map |
| page-contact | [返回地图] | page-map |

### 2.3 页面流程图

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    ▼                                     │
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐ │
│  Welcome │ ◀─▶ │  WhoAmI │ ◀─▶ │  Growth │ ◀─▶ │   Map   │ │
└─────────┘    └─────────┘    └─────────┘    └────┬────┘ │
                                                   │      │
                           ┌───────────────────────┼──────┴──────┐
                           │                       │              │
                           ▼                       ▼              ▼
                   ┌───────────┐          ┌───────────┐    ┌───────────┐
                   │ Projects  │          │ Projects  │    │Competitions│
                   │  Space    │          │Experience │    └───────────┘
                   └─────┬─────┘          └─────┬─────┘          │
                         │                    │                  │
                         └────────┬───────────┴──────────────────┘
                                  │
                                  ▼
                          ┌───────────┐
                          │   Back    │ ──── 返回 ────▶ page-map
                          │   btn     │
                          └───────────┘
```

---

## 3. 成长轨迹交互（公司详情弹窗）

### 3.1 交互描述

1. **触发**：用户点击成长轨迹中的公司节点
2. **展示**：显示详情卡片（淡入动画，300ms）
3. **关闭**：点击卡片外部区域关闭卡片

### 3.2 详情卡片内容

每个公司卡片包含：
- 公司名称 + 图标
- 职位/角色
- 时间段
- 实习简介（1-2句话）
- 关键项目列表（点击可查看详情）

### 3.3 视觉效果

```css
.detail-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, var(--color-wood), var(--color-wood-light));
  border: 4px solid var(--color-wood-dark);
  border-radius: 12px;
  padding: 30px;
  z-index: 1000;
  animation: popupFadeIn 0.3s ease-out;
}

@keyframes popupFadeIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
```

---

## 4. 导航按钮状态管理

### 4.1 箭头按钮状态规则

```javascript
const currentIndex = pages.indexOf(currentPageId);

prevBtn.disabled = currentIndex <= 0;   // 首页禁用
nextBtn.disabled = currentIndex >= pages.length - 1;  // 最后一页禁用
```

### 4.2 小地图特殊处理

- 右箭头始终隐藏（display: none）
- 左箭头点击返回 page-growth

---

## 5. 实现清单

### 5.1 需要修改的文件

| 文件 | 修改内容 |
|------|----------|
| `src/pages/index.astro` | 删除 page-experience，调整页面顺序，修复导航逻辑 |
| `src/components/GrowthTrackSection.astro` | 添加公司详情弹窗功能 |
| `src/components/RPGMapSection.astro` | 隐藏右箭头，保留左箭头 |

### 5.2 需要新增的功能

| 功能 | 描述 |
|------|------|
| 公司详情弹窗 | 点击成长轨迹公司节点显示弹窗 |
| 弹窗关闭 | 点击外部关闭 |
| 返回按钮 | 分支页面添加返回小地图按钮 |

---

## 6. 验收标准

- [ ] 导航箭头只在 0,1,2,3 页面显示
- [ ] 小地图页面只显示左箭头
- [ ] 分支页面（4-8）显示"返回地图"按钮
- [ ] 成长轨迹点击公司显示详情弹窗
- [ ] 点击弹窗外部关闭弹窗
- [ ] 页面切换无残留元素

---

*本文档由 Claude Code 生成 · 2026-06-02*

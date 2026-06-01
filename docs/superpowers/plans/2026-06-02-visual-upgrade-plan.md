# 星露谷风格网站 v3.0 - 实现计划

> **日期：** 2026-06-02
> **版本：** v3.0 FINAL
> **目标：** 像素复古游戏风视觉升级 + 拖动导航修复
> **风格：** 统一采用 像素复古C + 经典星露谷元素

---

## 阶段划分

### Phase 1: 基础系统升级 (Foundation)
**预计时间：** 2-3 小时

| 任务 | 内容 | 优先级 |
|------|------|--------|
| T1.1 | 字体加载 | Rajdhani + Press Start 2P |
| T1.2 | 全局色彩变量 | CSS Custom Properties |
| T1.3 | 扫描线效果 | 全局叠加层 |
| T1.4 | 基础组件样式 | 按钮/卡片/进度条 |

### Phase 2: 拖动导航修复 (Navigation Fix) ⭐
**预计时间：** 1-2 小时

| 任务 | 内容 | 优先级 |
|------|------|--------|
| T2.1 | 导航条底部固定 | 移至屏幕底部，z-index降至100 |
| T2.2 | 页面映射扩展 | 支持全部10个页面 |
| T2.3 | 拖动逻辑修复 | 左/右拖动切换页面 |
| T2.4 | 进度条可视化 | 小人位置反映当前页面 |

### Phase 3: 页面组件升级 (Component Upgrade)
**预计时间：** 3-4 小时

| 任务 | 页面 | 样式 |
|------|------|------|
| T3.1 | WelcomeSection | 像素小人 + 发光标题 |
| T3.2 | WhoAmISection | 气泡卡片渐变 |
| T3.3 | GrowthTrackSection | RPG技能树 + 进度条 |
| T3.4 | RPGMapSection | 地图导航发光 |
| T3.5 | ProjectsSpace | 项目卡片网格 |
| T3.6 | ProjectsExperience | 项目详情 |
| T3.7 | CompetitionsSection | 竞赛时间线 |
| T3.8 | SkillsSection | 技能进度条 |
| T3.9 | ContactSection | 联系方式 |

### Phase 4: 动效系统 (Animation)
**预计时间：** 2-3 小时

| 任务 | 内容 |
|------|------|
| T4.1 | 数字跳动 | Count-up 动画 |
| T4.2 | 页面转场 | 滑动 + 缩放 |
| T4.3 | 涟漪效果 | 按钮点击 |
| T4.4 | 悬停效果 | 发光 + 上浮 |

---

## 文件变更清单

### 需要修改的文件
```
src/pages/index.astro          # 拖动导航逻辑修复
src/styles/global.css         # 全局样式 + 色彩变量
src/components/BaseLayout.astro # 字体加载

# 组件 (Phase 3)
src/components/WelcomeSection.astro
src/components/WhoAmISection.astro
src/components/GrowthTrackSection.astro
src/components/RPGMapSection.astro
src/components/ProjectsSpace.astro
src/components/ProjectsExperience.astro
src/components/CompetitionsSection.astro
src/components/SkillsSection.astro
src/components/ContactSection.astro
```

### 需要新增的文件
```
src/styles/variables.css       # 色彩变量
src/styles/animations.css       # 动效定义
src/scripts/animations.ts      # 动画脚本
```

---

## 优先级矩阵

```
高 ⭐⭐⭐ 紧急
中 ⭐⭐ 重要
低 ⭐ 一般

T2.1 拖动导航底部固定     ⭐⭐⭐
T2.2 页面映射扩展        ⭐⭐⭐
T2.3 拖动逻辑修复         ⭐⭐⭐
T1.1 字体加载            ⭐⭐
T1.2 全局色彩变量        ⭐⭐
T1.3 扫描线效果         ⭐⭐
T3.x 页面组件升级       ⭐⭐
T4.x 动效系统           ⭐
```

---

## 验收标准

- [ ] 拖动导航不遮挡内容
- [ ] 拖动可切换全部10个页面
- [ ] 字体正确显示（Rajdhani + Press Start 2P）
- [ ] 所有页面使用新的色彩系统
- [ ] 数字跳动动画正常
- [ ] 页面转场流畅
- [ ] 涟漪效果可见
- [ ] 扫描线效果正常

---

*本文档由 Claude Code 生成 · 2026-06-02*
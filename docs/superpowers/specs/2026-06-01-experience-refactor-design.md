# 实习经历板块重构设计方案

> **日期：** 2026-06-01
> **状态：** 已批准
> **选用方案：** A（保留教育删除实习）+ B（中等弹窗）+ A（叉耙光标）

---

## 1. 需求概述

对个人网站进行以下优化：
1. **AboutSection 精简** - 保留"我是谁"介绍 + 教育背景，删除7张实习经历卡片
2. **IndustryTimeline 增强** - 作为唯一的实习经历展示模块
3. **Hover 公司介绍弹窗** - 鼠标悬停时显示中等量级信息
4. **自定义光标样式** - Stardew Valley 风格叉耙光标

---

## 2. 选用方案

### AboutSection 处理
**选用：A** - 保留教育背景 + 个人介绍，删除实习经历卡片

| 方案 | 描述 |
|------|------|
| A ✅ | 保留"我是谁"介绍 + 教育背景时间线，删除7张实习经历卡片，由 IndustryTimeline 完全替代 |
| B | AboutSection + IndustryTimeline + 实习经历卡片三模块并存 |

**原因：** 避免内容重复，IndustryTimeline 已经提供了更清晰的行业分组和成长路径展示。

### Hover 弹窗内容
**选用：B** - 中等弹窗（行业地位 + 主营业务 + 公司规模）

| 方案 | 描述 |
|------|------|
| A | 简短 tooltip：一句话简介 |
| B ✅ | 中等弹窗：行业地位 + 主营业务 + 公司规模 |
| C | 详细面板：和点击展开一样的完整内容 |

**原因：** tooltip 信息量太少，详细面板信息量太大，中等弹窗平衡两者。

### 光标样式
**选用：A** - 叉耙光标（Stardew Valley 农具风格）

| 方案 | 描述 |
|------|------|
| A ✅ | 🌾 叉耙光标 - Stardew Valley 农具风格 |
| B | ✨ 星星拖尾效果 |
| C | 🌻 向日葵光标 |
| D | 自定义 |

**原因：** 保持与网站 Stardew Valley 主题一致，增强品牌识别度。

---

## 3. 时间排序（已修正）

每个行业内的实习按时间早晚排列（从早到晚）：

### 🌐 互联网
| 公司 | 时间 | 角色 |
|------|------|------|
| 哈啰 | 2025.02 - 2025.05 | 产品经理实习生 |
| 美团 | 2025.05 - 2025.09 | 运动健身品类产品运营 |
| 小红书 | 2025.09 - 2025.12 | 商业产品实习生 |
| 字节跳动 TikTok | 2026.01 - 2026.04 | 印尼电商策略 |

### 🏥 医疗健康
| 公司 | 时间 | 角色 |
|------|------|------|
| 默克 | 2024.05 - 2024.09 | 风险合规实习生 |
| 美敦力 | 2024.09 - 2024.11 | 战略实习生 |

### 💼 金融/咨询
| 公司 | 时间 | 角色 |
|------|------|------|
| 安永 | 2023.12 - 2024.03 | 审计实习生 |

---

## 4. 组件变更设计

### 4.1 AboutSection 修改

**变更内容：**
- 删除"实习经历"部分（7张 ExperienceCard）
- 保留"个人介绍"部分
- 保留"教育背景"部分

**变更后结构：**
```
AboutSection
├── 个人介绍（我是谁）
├── 教育背景（港大硕士、上外贸本科）
└── [已删除] 实习经历卡片
```

### 4.2 IndustryTimeline 增强

**新增功能：**
1. 时间排序（每个行业内按时间早晚排列）
2. Hover 弹窗（鼠标悬停显示公司介绍）
3. 点击展开详情（与之前相同的滑出面板）

**公司介绍内容（Hover 弹窗）：**
| 公司 | 一句话介绍 |
|------|-----------|
| 字节跳动 | 全球最大短视频平台 TikTok 母公司，市值超 2000 亿美元 |
| 小红书 | 月活 2.6 亿的生活方式分享平台，估值超 200 亿美元 |
| 美团 | 国内最大本地生活服务平台，年营收超 2000 亿元 |
| 哈啰 | 阿里旗下出行科技公司，哈啰单车/打车/酒店业务 |
| 美敦力 | 全球最大医疗器械公司，市值超 1000 亿美元 |
| 默克 | 全球领先的科技公司，生命科学/医药健康领域 |
| 安永 | 全球四大会计师事务所之一，专业服务覆盖 150+ 国家 |

### 4.3 自定义光标

**实现方式：**
- 使用 CSS `cursor` 属性
- 自定义叉耙/手型 SVG 光标
- Stardew Valley 风格配色（土褐色 + 木质纹理）

---

## 5. 交互设计

### 5.1 Hover 弹窗交互

```
用户鼠标划入公司名称
    ↓
显示半透明背景遮罩
    ↓
弹出公司介绍面板（中等尺寸）
    ↓
显示：行业地位 + 主营业务 + 公司规模
    ↓
用户鼠标移出
    ↓
面板消失
```

### 5.2 点击展开交互（保持不变）

```
用户点击公司卡片
    ↓
右侧滑出详情抽屉
    ↓
显示完整项目内容（背景/挑战/方案/成果）
    ↓
点击关闭或点击遮罩区域
    ↓
抽屉关闭
```

### 5.3 光标样式

```
默认状态：叉耙/手型光标
悬停可点击元素：叉耙光标高亮
输入框：文本光标
```

---

## 6. 文件变更清单

### 需要修改的文件
| 文件 | 变更内容 |
|------|----------|
| `src/components/AboutSection.astro` | 删除实习经历部分 |
| `src/components/IndustryTimeline.astro` | 时间排序 + Hover弹窗 + 公司数据 |
| `src/styles/global.css` | 添加自定义光标样式 |
| `src/data/timeline.json` | 可能需要调整顺序 |

### 新增文件
| 文件 | 用途 |
|------|------|
| 无 | 不需要新增文件 |

### 页面结构调整
```astro
<main>
  <HeroSection />          ← 保持不变
  <AboutSection />         ← 删除实习经历部分
  <IndustryTimeline />     ← 增强：时间排序 + Hover弹窗
  <StatsBanner />          ← 保持不变
  <WhyChooseMe />          ← 保持不变
  <ProjectsSection />      ← 保持不变
  <SkillsSection />        ← 保持不变
  <ContactSection />       ← 保持不变
</main>
```

---

## 7. 公司介绍数据

```typescript
const companyInfo = {
  '字节跳动': {
    industry: '互联网/科技',
    description: '全球最大短视频平台 TikTok 母公司',
    scale: '市值超 2000 亿美元，员工超 15 万人',
    position: '全球最具价值独角兽之一'
  },
  '小红书': {
    industry: '互联网/社交电商',
    description: '月活 2.6 亿的生活方式分享平台',
    scale: '估值超 200 亿美元',
    position: '国内头部社交电商平台'
  },
  '美团': {
    industry: '本地生活服务',
    description: '国内最大本地生活服务平台',
    scale: '年营收超 2000 亿元',
    position: '外卖/酒旅/到店龙头'
  },
  '哈啰': {
    industry: '出行科技',
    description: '阿里旗下出行科技公司',
    scale: '哈啰单车覆盖超 400 城市',
    position: '共享单车行业头部'
  },
  '美敦力': {
    industry: '医疗器械',
    description: '全球最大医疗器械公司',
    scale: '市值超 1000 亿美元',
    position: '心脏支架/胰岛素泵等领域全球第一'
  },
  '默克': {
    industry: '医药健康',
    description: '全球领先科技公司',
    scale: '年营收超 200 亿欧元',
    position: '生命科学/医药健康领域龙头'
  },
  '安永': {
    industry: '金融服务/咨询',
    description: '全球四大会计师事务所之一',
    scale: '覆盖 150+ 国家，30 万+ 员工',
    position: '全球顶级审计/咨询机构'
  }
};
```

---

## 8. 光标样式实现

### 叉耙光标 SVG（Base64 内联）

```css
/* 自定义叉耙光标 */
.custom-cursor-fork {
  cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTE4IDBoLTJ2MjBoLTJWMGgtMnY1aC0ydjI1aC0ydi0yNWgtMnoiIGZpbGw9IiNhYjViM2MiLz48cGF0aCBkPSJNMTAgMGgtMnY0aC0ydjJoLTJ2LTRoLTJ2LTVoNHY1aC0ydi0zaC0ydjNoLTJ2LTJoLTJ2NGgwdjJoLTJoLTJoNHYtNWgtNHY1aC0ydjJoLTJoLTJoLTR2LTJoLTJ2NGgwdjJoLTJoLTJoNHYtNWgtNHY1aC0ydjJoLTJoLTJoLTR2LTJoLTJ2NGgwdjJoLTJoLTJoNHYtNWgtNHY1aC0ydjJoLTJoLTJoLTR2LTJoLTJ2NGgwaDIiIGZpbGw9IiM5YjRlNDAiLz48L3N2Zz4=') 12 12, auto;
}

/* 悬停状态 */
a:hover, button:hover, .clickable:hover {
  cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTE4IDBoLTJ2MjBoLTJWMGgtMnY1aC0ydjI1aC0ydi0yNWgtMnoiIGZpbGw9IiNmZjZiMzUiLz48cGF0aCBkPSJNMTAgMGgtMnY0aC0ydjJoLTJ2LTRoLTJ2LTVoNHY1aC0ydjNIMHYyMGgtMnoiIGZpbGw9IiM0Y2ZlMmYiLz48L3N2Zz4=') 12 12, auto;
}
```

---

## 9. 验收标准

### AboutSection
- [ ] "我是谁"介绍保留
- [ ] 教育背景时间线保留
- [ ] 7张实习经历卡片已删除

### IndustryTimeline
- [ ] 每个行业内按时间排序（从早到晚）
- [ ] Hover 公司名称显示中等弹窗
- [ ] 点击公司卡片显示详情滑出面板
- [ ] 弹窗包含：行业地位 + 主营业务 + 公司规模

### 光标
- [ ] 全局使用叉耙/手型光标
- [ ] 悬停时高亮效果
- [ ] Stardew Valley 风格配色

### 其他
- [ ] 页面正常加载，无报错
- [ ] 所有交互功能正常
- [ ] Git 提交并推送到 GitHub

---

## 10. 技术栈

- **框架：** Astro 4.x
- **样式：** Tailwind CSS
- **动画：** CSS transitions + vanilla JS
- **光标：** CSS cursor + SVG data URI

---

*本文档由 Claude Code 生成，2026-06-01*
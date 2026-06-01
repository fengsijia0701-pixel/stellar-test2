# 星露谷风格网站 v3.0 - 最终设计规范

> **日期：** 2026-06-02
> **版本：** v3.0 FINAL
> **主题：** 像素复古游戏风 · 融合经典星露谷元素

---

## 设计决策

### 页面风格选择
**所有页面统一采用：C. 像素复古风格 + 经典星露谷元素**

| 页面 | 风格 | 特色 |
|------|------|------|
| 全部9个页面 | 像素复古 + 星露谷 | 深绿背景 + 像素字体 + 像素小人 + 叉耙光标 |

---

## 1. 字体系统 Typography

| 用途 | 字体 | 说明 |
|------|------|------|
| 中文内容/标题 | **Rajdhani Bold** | 几何锐利，现代像素感 |
| 英文/数字/标签 | **Press Start 2P** | 经典8-bit像素字体 |
| 备用 | 'Courier New', monospace | 系统等宽字体 |

### 加载方式
```html
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Press+Start+2P&display=swap" rel="stylesheet">
```

---

## 2. 色彩系统 Color Palette - 像素复古 + 星露谷

### 主背景色（深绿游戏风）
| 用途 | 色值 | 说明 |
|------|------|------|
| 主背景 | #0f1f0f (深墨绿) | RPG游戏地图背景 |
| 次背景 | #1a2f1a (森林绿) | 卡片/面板背景 |
| 草地色 | #2d5a27 (像素绿) | 草地/进度条背景 |
| 泥土色 | #3d2817 (棕色) | 路径/边框 |

### 强调色（霓虹像素风）
| 颜色名 | 色值 | 渐变 | 用途 |
|--------|------|------|------|
| 绿色 | #00ff88 | → #00cc6a | 成功/增长/主强调 |
| 黄色 | #ffff00 | → #ffcc00 | 金币/高亮/数据 |
| 青色 | #00ffff | → #00cccc | 互联网/科技 |
| 洋红 | #ff00ff | → #cc00cc | 选中/强调 |
| 橙色 | #ff8e53 | → #ff6b6b | 火焰/警告/点击 |

### 星露谷经典色
| 颜色名 | 色值 | 用途 |
|--------|------|------|
| 天空蓝 | #87CEEB | 天空背景 |
| 草地绿 | #7CB342 | 草地背景 |
| 木棕 | #8B5A2B | 木框/边框 |
| 羊皮纸 | #F5E6C8 | 内容面板背景 |
| 暖棕 | #5D4037 | 文字/阴影 |

### 边框与轮廓
| 用途 | 色值 |
|------|------|
| 默认边框 | #3d5a27 |
| 像素边框 | #2d4a1f (深绿) |
| 发光效果 | rgba(0,255,136,0.4) |

---

## 3. UI组件规范

### 3.1 像素游戏按钮
```css
.pixel-btn {
  background: linear-gradient(180deg, #2d5a27, #1a3a1a);
  border: 3px solid #00ff88;
  border-radius: 4px;
  color: #00ff88;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow:
    0 4px 0 #1a2f1a,
    0 0 15px rgba(0,255,136,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.15s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.pixel-btn:hover {
  transform: translateY(-2px);
  border-color: #ffff00;
  color: #ffff00;
  box-shadow:
    0 6px 0 #1a2f1a,
    0 0 25px rgba(255,255,0,0.4);
}

.pixel-btn:active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 #1a2f1a,
    0 0 15px rgba(0,255,136,0.3);
}
```

### 3.2 数据卡片（RPG风格）
```css
.rpg-card {
  background: linear-gradient(135deg, #1a2f1a, #0f1f0f);
  border: 3px solid #2d5a27;
  border-radius: 8px;
  padding: 16px 20px;
  text-align: center;
  position: relative;
  box-shadow:
    inset 0 0 20px rgba(0,255,136,0.05),
    0 4px 0 #0a150a;
}

.rpg-card::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 1px solid #3d5a27;
  border-radius: 4px;
  pointer-events: none;
}

.rpg-card.highlight {
  border-color: #ffff00;
  background: linear-gradient(135deg, #3d3a00, #2d2a00);
}

.rpg-number {
  font-family: 'Press Start 2P', cursive;
  font-size: 1.1rem;
  color: #00ff88;
  text-shadow: 2px 2px 0 #000;
}

.rpg-card.highlight .rpg-number {
  color: #ffff00;
  text-shadow: 2px 2px 0 #5d4a00;
}

.rpg-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  color: #90EE90;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### 3.3 RPG进度条
```css
.rpg-progress {
  height: 16px;
  background: #0f1f0f;
  border: 2px solid #2d5a27;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.rpg-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 8px,
    rgba(0,0,0,0.3) 8px,
    rgba(0,0,0,0.3) 10px
  );
  pointer-events: none;
  z-index: 2;
}

.rpg-progress-fill {
  height: 100%;
  position: relative;
  transition: width 1s ease-out;
}

.rpg-progress-fill.green {
  background: linear-gradient(90deg, #00ff88, #00cc6a);
}
.rpg-progress-fill.gold {
  background: linear-gradient(90deg, #ffff00, #ffcc00);
}
.rpg-progress-fill.cyan {
  background: linear-gradient(90deg, #00ffff, #00cccc);
}
.rpg-progress-fill.magenta {
  background: linear-gradient(90deg, #ff00ff, #cc00cc);
}
```

### 3.4 星露谷木框面板
```css
.stardew-panel {
  background: linear-gradient(135deg, #8B4513, #A0522D, #6B3E26);
  border-radius: 8px;
  padding: 8px;
  box-shadow:
    0 6px 0 #5D3A1A,
    0 10px 25px rgba(0,0,0,0.5),
    inset 0 2px 0 rgba(255,255,255,0.1);
}

.stardew-panel-inner {
  background: linear-gradient(180deg, #F5E6C8, #E8DCC8);
  border-radius: 4px;
  padding: 20px;
  position: relative;
}

.stardew-panel-inner::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border: 2px dashed rgba(139,90,43,0.3);
  border-radius: 2px;
  pointer-events: none;
}
```

### 3.5 技能节点
```css
.skill-node {
  background: #0f1f0f;
  border: 3px solid #2d5a27;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    inset 0 0 15px rgba(0,255,136,0.1),
    0 3px 0 #1a2f1a;
}

.skill-node:hover {
  border-color: #00ff88;
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 20px rgba(0,255,136,0.2),
    0 6px 0 #1a2f1a,
    0 0 20px rgba(0,255,136,0.3);
}

.skill-node.current {
  border-color: #ffff00;
  box-shadow:
    inset 0 0 20px rgba(255,255,0,0.2),
    0 3px 0 #5d4a00,
    0 0 25px rgba(255,255,0,0.4);
}
```

---

## 4. 拖动导航 v3 - 底部固定设计

### 核心问题修复
1. **遮挡内容** → 固定在屏幕底部，z-index: 100
2. **页面跳转不完整** → 支持全部10个页面

### 设计规范
```css
#path-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  z-index: 100;
  background: linear-gradient(180deg, #3d2817, #2a1a0f);
  border-top: 3px solid #8B4513;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;
}

.nav-track {
  flex: 1;
  max-width: 200px;
  height: 8px;
  background: #2d5a27;
  border-radius: 4px;
  position: relative;
  border: 2px solid #3d5a27;
}

.nav-char {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #ffff00;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 12px rgba(255,255,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: grab;
}

.nav-char:active {
  cursor: grabbing;
}
```

### 页面映射（全部10个页面）
```javascript
const ALL_PAGES = [
  'page-welcome',              // 0
  'page-whoami',               // 1
  'page-growth',               // 2
  'page-experience',           // 3
  'page-map',                  // 4
  'page-projects-space',       // 5
  'page-projects-experience',  // 6
  'page-competitions',         // 7
  'page-skills',               // 8
  'page-contact'              // 9
];

// 计算当前位置百分比
const progress = currentIndex / (ALL_PAGES.length - 1);
navChar.style.left = `${progress * 100}%`;
```

### 拖动触发阈值
```javascript
const THRESHOLD = 30; // 像素

if (deltaX > THRESHOLD && currentIndex < ALL_PAGES.length - 1) {
  // 下一页
} else if (deltaX < -THRESHOLD && currentIndex > 0) {
  // 上一页
}
// 首尾循环
```

---

## 5. 动效系统 Animation

### 5.1 数字跳动动画
```javascript
function animateNumber(element, targetValue, duration = 1500) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(targetValue * easeOut);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

### 5.2 页面转场（像素滑入）
```css
.page-enter {
  animation: pixelEnter 0.4s ease-out forwards;
}

.page-exit {
  animation: pixelExit 0.3s ease-in forwards;
}

@keyframes pixelEnter {
  0% {
    opacity: 0;
    transform: translateX(40px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes pixelExit {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-40px);
    filter: blur(4px);
  }
}
```

### 5.3 涟漪点击效果
```javascript
function createRipple(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();

  ripple.style.cssText = `
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(0,255,136,0.6);
    border-radius: 50%;
    left: ${event.clientX - rect.left}px;
    top: ${event.clientY - rect.top}px;
    transform: scale(0);
    animation: ripplePop 0.4s ease-out forwards;
    pointer-events: none;
  `;

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 400);
}
```

### 5.4 像素扫描线效果
```css
.scanlines::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9998;
}
```

### 5.5 浮动动画
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.float-element {
  animation: float 3s ease-in-out infinite;
}

.sway-element {
  animation: sway 2s ease-in-out infinite;
}
```

### 5.6 发光文字效果
```css
.pixel-glow-green {
  color: #00ff88;
  text-shadow:
    0 0 5px #00ff88,
    0 0 10px #00ff88,
    2px 2px 0 #000;
}

.pixel-glow-yellow {
  color: #ffff00;
  text-shadow:
    0 0 5px #ffff00,
    0 0 10px #ffff00,
    2px 2px 0 #5d4a00;
}

.pixel-glow-cyan {
  color: #00ffff;
  text-shadow:
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    2px 2px 0 #005555;
}
```

---

## 6. 星露谷经典元素

### 6.1 像素小人（保留并强化）
```html
<div class="pixel-character">
  <div class="pixel-head">
    <div class="pixel-hair"></div>
    <div class="pixel-glasses"></div>
    <div class="pixel-mouth"></div>
  </div>
  <div class="pixel-body"></div>
  <div class="pixel-arms"></div>
  <div class="music-notes">♪ ♫ ♪</div>
</div>
```

### 6.2 自定义光标（保留叉耙）
```css
cursor: url('data:image/svg+xml,...'), auto;
```

### 6.3 装饰元素
```html
<div class="decorations">
  <span class="deco tree">🌲</span>
  <span class="deco flower">🌸</span>
  <span class="deco grass">🌿</span>
  <span class="deco sun">☀️</span>
</div>
```

---

## 7. 页面结构调整

### 拖动导航占位
- 固定高度：55px
- 固定位置：屏幕底部
- z-index：100（不遮挡内容）

### 内容区域 padding
```css
.page-content {
  padding-bottom: 80px; /* 为导航条+间距留空间 */
}
```

---

## 8. 验收标准

- [ ] 字体正确加载：Rajdhani (中文) + Press Start 2P (英文/数字)
- [ ] 深绿像素风背景正常显示
- [ ] 拖动导航固定在底部，不遮挡页面内容
- [ ] 拖动可切换全部10个页面
- [ ] 数字跳动动画正常工作
- [ ] 页面转场动画流畅（像素模糊效果）
- [ ] 涟漪点击效果可见
- [ ] 扫描线叠加效果正常
- [ ] 发光文字效果正常显示
- [ ] 像素小人动画正常
- [ ] 叉耙光标正常

---

## 9. 实现优先级

| 优先级 | 任务 |
|--------|------|
| P0 ⭐⭐⭐ | 拖动导航修复（底部固定 + 10页面支持） |
| P1 ⭐⭐ | 字体加载 + 全局色彩变量 |
| P1 ⭐⭐ | 扫描线效果 |
| P2 ⭐ | 数据卡片重设计 |
| P2 ⭐ | 进度条重设计 |
| P2 ⭐ | 按钮样式升级 |
| P3 | 动效增强（涟漪/发光/浮动） |

---

*本文档由 Claude Code 生成 · UI总监设计 · 2026-06-02*
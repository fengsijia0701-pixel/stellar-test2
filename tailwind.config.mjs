/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Stardew Valley palette
        primary: '#BC7349',      // 木材棕（主色）
        secondary: '#4A7A3D',     // 草地绿
        accent: '#C4846C',        // 桃橙
        highlight: '#F2D388',     // 小麦金
        sky: '#58A4B0',           // 天空蓝
        evening: '#584662',       // 暮紫
        dark: '#3A2E2A',          // 深木色
        light: '#FFF8E7',          // 奶油白
        bgLight: '#F5EDE0',        // 羊皮纸色
        cardBg: '#FFF3D6',         // 卡片底色
      },
      fontFamily: {
        heading: ['Gaegu', 'cursive'],  // 手写风格更有童趣
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'stardew': '0 4px 12px rgba(58, 46, 42, 0.15)',
        'stardew-lg': '0 8px 24px rgba(58, 46, 42, 0.2)',
      },
      borderRadius: {
        'stardew': '12px',
      },
    },
  },
  plugins: [],
};
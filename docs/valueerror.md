# 困难点与解决方法记录

> 本次项目中遇到的困难点及有效解决方案

---

## 问题 1：GitHub 推送失败 - Connection Reset

**表现：**
```
fatal: unable to access 'https://github.com/...': Recv failure: Connection was reset
error: failed to connect to github.com port 443 after 21108 ms
```

**原因：** 国内网络访问 GitHub 不稳定，需要 VPN

**解决方法：**
- 多尝试几次推送，有时重试就能成功
- 或使用 `--timeout` 参数增加超时时间

---

## 问题 2：Vercel 部署被 Block - 无访问权限

**表现：**
```
The deployment was blocked because the commit author did not have contributing access to the project on Vercel.
Hobby teams do not support collaboration.
```

**原因：** 代码是第三方 Token 推送的，但 Vercel 认为推送者没有项目访问权限

**解决方法：**
- 在 GitHub 网页上直接编辑文件（创建新 commit）
- 或者本地用自己的账号 `git commit` 后再 `git push`
- 本质：提交者的 GitHub 账号需要和 Vercel 关联

---

## 问题 3：Git 提交者身份未设置

**表现：**
```
Author identity unknown
fatal: unable to auto-detect email address
```

**解决方法：**
```bash
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

---

## 问题 4：node_modules 和 npm 命令找不到

**表现：**
```
npm error Could not read package.json
/usr/bin/bash: line 1: npm: command not found
```

**原因：** 当前工作目录不对，应该在 `personal-website` 文件夹内

**解决方法：**
```bash
cd personal-website
npm install
npm run build
```

---

## 问题 5：Git 分支推送被拒（需要先 pull）

**表现：**
```
! [rejected] main -> main (fetch first)
error: failed to push some refs
hint: Updates were rejected because the remote contains work that you do not have locally
```

**解决方法：**
```bash
git pull origin main --rebase
git push origin main
```
或使用 stash 方式：
```bash
git stash
git pull origin main --rebase
git stash pop
git push origin main
```

---

## 问题 6：Astro 模板字符串语法错误

**表现：**
```
Expected ";" but found "`<string,${"
Location: AboutSection.astro:41:40
```

**原因：** 在 `.astro` 文件的 JSX 表达式中使用了 TypeScript 类型注解，esbuild 不支持

**解决方法：**
- 将类型注解提前到脚本部分的 `const` 定义中
- 不要在 JSX map 回调内部使用 inline 类型注解
- 示例：
```astro
<!-- 错误写法 -->
{timelineData.map((item) => {
  const colorMap: Record<string, ...> = {...}  // 不能inline定义类型
  return (...)
})}

<!-- 正确写法 -->
<script>
const colorMap: Record<string, ...> = {...};
</script>
{timelineData.map((item) => (
  <div>{/* 使用外部定义的 colorMap */}</div>
))}
```

---

## 问题 7：Tailwind 暗黑模式类名冲突

**表现：** `text-dark/70` 写法部分环境可能不识别

**解决方法：**
- 使用完整的 Tailwind 颜色变量配置
- 在 `tailwind.config.mjs` 中预定义颜色

---

## 问题 8：文件编辑前未读取

**表现：**
```
File has not been read yet. Read it first before writing to it.
```

**解决方法：**
- 使用 Edit 工具前先 Read 文件
- 或确保 Write 操作针对已存在的文件时先读取

---

## 问题 9：跨目录操作 Git

**表现：** `fatal: not a git repository`

**原因：** `cd` 在复合命令中只影响同一行，后续命令又回到原目录

**解决方法：**
- 使用 `cd /path && git status` 合并命令
- 或在复合脚本中每条命令前都加 `cd /path`

---

## 问题 10：npm install 提交了 node_modules

**表现：** 仓库体积过大，包含数万文件

**解决方法：**
```bash
# 在 .gitignore 中添加
node_modules/
dist/
.DS_Store
*.log
```

已创建 `.vercelignore` 解决

---

## 问题 11：图片链接无法访问（阿里云 OSS）

**表现：** 无法直接通过 URL 获取图片内容

**解决方法：**
- 让用户用文字描述代替图片内容
- 或让用户直接在对话中粘贴文字信息

---

## 关键经验总结

1. **GitHub 推送不稳定** → 多试几次或等待网络恢复
2. **Vercel 权限问题** → 确保 commit 作者和 Vercel 账号一致
3. **工作目录** → 每条命令确认当前在正确目录
4. **Astro 类型** → 不要在 JSX 表达式中 inline 类型定义
5. **文档同步** → commit 后立即 push，避免本地堆积

---

*最后更新：2026-06-01*
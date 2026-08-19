# Teaching Tracker V1.2.1

大学讲师备课 PWA：课程、Week/Session、To Do、课件 Preview、教学笔记、日历、提醒、用户登入、中文/English 切换与 Supabase 云端同步。

## V1.2.1 已实现
- Today Dashboard：下一节课、今日任务、备课进度、Upcoming
- Courses + Weekly Class Sessions
- 新建课次自动生成 4 项备课 Checklist
- To Do：优先级、Due time、提醒、每周重复、完成/删除
- Calendar：课程 + Task deadline
- Courseware：上传/下载 + Preview；Supabase 模式使用 private Storage bucket
- Preview：PDF、图片、文本、音频、视频；Office 文件提供安全预览卡片 + Download
- Teaching Notes / Reflection
- JSON 数据备份与 Local Demo 恢复
- Local Demo：不配置数据库也能马上试用
- **用户账户：Email + Password 登入、注册、Magic Link、忘记密码、登出**
- **中文 / English 全局切换，选择保存在浏览器**
- Supabase Postgres CRUD + RLS
- PWA Service Worker、Install App、系统通知
- 后台 Web Push：VAPID + Supabase Edge Function + pg_cron/pg_net
- GitHub Pages workflow + 公司静态服务器部署

## 本地运行
不要直接用 `file://` 打开，因为 PWA / Service Worker / Notification 需要 HTTP(S)。

Windows：双击 `start-local.bat`。

macOS / Linux：
```text
./start-local.sh
```
然后访问 `http://localhost:8080`。默认进入 Local Demo。

## 用户登入 / Supabase Auth
1. 创建 Supabase Project。
2. SQL Editor 执行 `supabase/schema.sql`。
3. Authentication 中开启 Email provider。V1.2 同时支持 Password 与 Magic Link。
4. 在 Supabase Auth URL Configuration 中，把开发地址、GitHub Pages 地址和公司服务器 HTTPS 地址加入允许的 Redirect URLs。
5. 编辑 `js/config.js`：
```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabasePublishableKey: "YOUR_PUBLISHABLE_KEY",
  storageBucket: "lecture-files",
  vapidPublicKey: ""
};
```
6. 刷新页面，右上角点 **登入 / Sign in**。

支持的账户流程：
- Email + Password 登入
- Create account / 注册
- Magic Link 无密码登入
- Forgot password / 密码重置邮件
- Sign out / 退出登入

如果 Supabase 要求 Email confirmation，新注册用户需先点击确认邮件后再登入。

浏览器中只能放 Publishable Key；不要把 Secret Key / `service_role` 写到 `js/config.js`。

## 中文 / English
右上角可直接点 **中 / EN**。Settings → Language 里也有同样的切换。

语言设置写入当前浏览器的 `localStorage`，刷新和下次打开都会保留。用户自己填写的课程名称、Topic、任务标题、教学笔记不会被自动翻译；只切换系统 UI。

## 后台 Web Push（可选配置）
本地通知已经可以测试。要让 App 关闭时也收到提醒：
1. 生成 VAPID public/private keys。
2. public key 写入 `js/config.js` 的 `vapidPublicKey`。
3. 部署 `supabase/functions/send-reminders`；`supabase/config.toml` 已设置 `verify_jwt = false`，函数仍会校验私有 `x-cron-secret`。
4. 设置 Edge Function secrets：`VAPID_PUBLIC_KEY`、`VAPID_PRIVATE_KEY`、`VAPID_SUBJECT`、`CRON_SECRET`。
5. 启用 `pg_cron`、`pg_net`，按 `supabase/cron-example.sql` 配置。生产环境建议把调度 secret 放入 Supabase Vault。
6. 登入网页后在 Settings 点 Enable Notifications。

## GitHub Pages
把整个目录提交到 GitHub，push 到 `main`，Repository Settings → Pages 选择 GitHub Actions。`.github/workflows/deploy-pages.yml` 会只发布网页运行所需文件。

Supabase Auth 需要把最终 GitHub Pages URL 加入允许的 Redirect URLs。

## 公司服务器
把下面内容复制到 HTTPS 静态站点目录：
```text
index.html
manifest.webmanifest
sw.js
.nojekyll
css/
js/
assets/
```
Nginx 示例：
```nginx
server {
  listen 443 ssl;
  server_name teaching.example.company;
  root /var/www/teaching-tracker;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

## 文件 Preview
- Course / Session / Courseware 页面可点击 **Preview / 预览**。
- 浏览器内预览：PDF、图片、TXT/CSV/JSON/Markdown/XML/LOG、音频、视频。
- Office 文件（PPT/PPTX/DOC/DOCX/XLS/XLSX）不会发送到第三方在线 Viewer，而是显示安全预览卡片并提供 Download。
- Local Demo 只有本次浏览器会话中实际上传的文件可以预览；内置示例文件只是 metadata。Supabase Cloud 模式会从 private Storage 下载临时 Blob 到浏览器预览。

## V1.2 说明
- Local Demo 中上传文件只保存 metadata；文件 bytes 仅在当前浏览器会话可预览/下载，刷新后不会保留。连接 Supabase 后才是持久化课件 Storage。
- JSON Backup 不嵌入大型 PPT/PDF bytes；Cloud 文件继续保存在 Supabase Storage。
- 推荐下一步：Semester Rollover、课件 Version History、Recent Files、完整 ZIP Archive、模板管理和全局搜索。


## V1.2.1 中文布局优化

- 修复桌面左侧导航中文被挤成逐字竖排的问题：图标与文字现在使用独立宽度规则。
- 中文界面加入系统 CJK 字体栈（苹方 / 微软雅黑 / Noto Sans CJK 等回退）。
- 优化中文标题、Eyebrow、按钮与徽章的字距和换行。
- 优化 761–900px 中等宽度桌面/平板侧边栏，避免中文标签被压缩。
- 移动端底部导航中文标签保持单行。

# V1.2 → V1.2.1 升级说明

这是纯前端布局修复，不需要修改 Supabase 数据库。

建议替换：

- `index.html`
- `css/app.css`
- `sw.js`

如果是整包部署，直接用 V1.2.1 文件覆盖 V1.2 即可。Service Worker cache 已升级为 `teaching-tracker-v1.2.1`，重新加载后会清理旧缓存。

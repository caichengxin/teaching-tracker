# Upgrade: V1.1 → V1.2

V1.2 adds user-facing authentication and Chinese/English switching. Existing V1.1 data tables and RLS policies remain compatible; no new application table is required.

## Replace these web files
- `index.html`
- `css/app.css`
- `js/app.js`
- `js/db.js`
- `js/notifications.js`
- **new:** `js/i18n.js`
- `sw.js`

Keep your existing `js/config.js` values when upgrading a configured deployment.

## Supabase Auth
In the Supabase dashboard:
1. Keep Email provider enabled.
2. Confirm the site URLs used by local development, GitHub Pages, and the company server are allowed Redirect URLs.
3. Email confirmation can remain on or off depending on your preferred account policy.

V1.2 supports:
- Email + password sign-in
- Account creation
- Magic Link
- Password-reset email
- Sign out

## PWA cache
The cache name is now `teaching-tracker-v1.2.0`. After redeploying, the Service Worker removes the previous app-shell cache during activation.

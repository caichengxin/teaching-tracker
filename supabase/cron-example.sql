-- Replace YOUR_PROJECT_REF and YOUR_CRON_SECRET. In production, store secrets in Supabase Vault.
select cron.schedule('teaching-tracker-reminders','* * * * *',$$ select net.http_post(url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-reminders',headers:=jsonb_build_object('Content-Type','application/json','x-cron-secret','YOUR_CRON_SECRET'),body:='{}'::jsonb); $$);

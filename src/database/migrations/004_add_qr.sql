-- 004_add_qr.sql
ALTER TABLE mascotas ADD COLUMN IF NOT EXISTS qr_code TEXT;
UPDATE schema_version SET version = 4;

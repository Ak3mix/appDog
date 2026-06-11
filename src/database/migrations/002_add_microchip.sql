-- 002_add_microchip.sql
-- Si el campo microchip no estuviera en mascotas, aquí se añadiría.
-- Como ya está en 001, dejamos este archivo como ejemplo de estructura.
ALTER TABLE mascotas ADD COLUMN IF NOT EXISTS microchip_tipo TEXT;
UPDATE schema_version SET version = 2;

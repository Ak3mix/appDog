-- 003_add_veterinario.sql
CREATE TABLE IF NOT EXISTS eventos_medicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mascota_id INTEGER,
    tipo TEXT, -- vacunas, tratamientos, diagnósticos, citas
    detalle TEXT,
    fecha TEXT,
    sync_status TEXT DEFAULT 'pending',
    FOREIGN KEY(mascota_id) REFERENCES mascotas(id)
);

CREATE TABLE IF NOT EXISTS documentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mascota_id INTEGER,
    tipo TEXT,
    ruta TEXT,
    fecha TEXT,
    sync_status TEXT DEFAULT 'pending',
    FOREIGN KEY(mascota_id) REFERENCES mascotas(id)
);

UPDATE schema_version SET version = 3;

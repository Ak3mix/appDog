-- 001_initial.sql
CREATE TABLE IF NOT EXISTS schema_version (version INTEGER PRIMARY KEY);
INSERT INTO schema_version (version) VALUES (1);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT, 
    email TEXT, 
    sync_status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS mascotas (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT, 
    especie TEXT, 
    raza TEXT, 
    sexo TEXT, 
    fecha_nacimiento TEXT, 
    microchip TEXT, 
    foto TEXT, 
    notas TEXT, 
    sync_status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS pesos (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    mascota_id INTEGER, 
    peso REAL, 
    fecha TEXT, 
    sync_status TEXT DEFAULT 'pending', 
    FOREIGN KEY(mascota_id) REFERENCES mascotas(id)
);

CREATE TABLE IF NOT EXISTS configuracion (
    id INTEGER PRIMARY KEY, 
    tema TEXT, 
    notificaciones BOOLEAN, 
    idioma TEXT
);

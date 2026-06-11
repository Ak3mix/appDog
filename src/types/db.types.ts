// src/types/db.types.ts
export interface BaseEntity {
  id?: number;
  sync_status?: 'pending' | 'synced' | 'deleted';
}

export interface Pet extends BaseEntity {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  fecha_nacimiento: string;
  microchip: string;
  foto: string;
  notas: string;
  qr_code?: string;
}

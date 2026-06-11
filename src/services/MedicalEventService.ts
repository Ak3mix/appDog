import { databaseService } from './DatabaseService';

export class MedicalEventService {
  async add(mascota_id: number, tipo: string, detalle: string, fecha: string) {
    const db = await databaseService.getDb();
    await db.run('INSERT INTO eventos_medicos (mascota_id, tipo, detalle, fecha, sync_status) VALUES (?,?,?,?,?)', 
      [mascota_id, tipo, detalle, fecha, 'pending']);
  }

  async getAll(mascota_id: number, tipo?: string) {
    const db = await databaseService.getDb();
    let query = 'SELECT * FROM eventos_medicos WHERE mascota_id = ?';
    const params: any[] = [mascota_id];
    if (tipo) {
      query += ' AND tipo = ?';
      params.push(tipo);
    }
    const res = await db.query(query, params);
    return res.values || [];
  }
}

export const medicalEventService = new MedicalEventService();

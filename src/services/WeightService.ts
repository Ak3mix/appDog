import { databaseService } from './DatabaseService';

export class WeightService {
  async getAll(mascota_id: number) {
    const db = await databaseService.getDb();
    const res = await db.query('SELECT * FROM pesos WHERE mascota_id = ? ORDER BY fecha DESC', [mascota_id]);
    return res.values || [];
  }

  async add(mascota_id: number, peso: number, fecha: string) {
    const db = await databaseService.getDb();
    await db.run('INSERT INTO pesos (mascota_id, peso, fecha, sync_status) VALUES (?,?,?,?)', 
      [mascota_id, peso, fecha, 'pending']);
  }

  async getStats(mascota_id: number) {
    const db = await databaseService.getDb();
    const res = await db.query('SELECT AVG(peso) as avg, MAX(peso) as max, MIN(peso) as min FROM pesos WHERE mascota_id = ?', [mascota_id]);
    return res.values ? res.values[0] : { avg: 0, max: 0, min: 0 };
  }
}

export const weightService = new WeightService();

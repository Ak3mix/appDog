import { databaseService } from './DatabaseService';
import { Pet } from '../types/db.types';

export class PetService {
  async getAll(): Promise<Pet[]> {
    const db = await databaseService.getDb();
    const res = await db.query('SELECT * FROM mascotas WHERE sync_status != "deleted"');
    return (res.values as Pet[]) || [];
  }

  async create(pet: Omit<Pet, 'id' | 'sync_status'>): Promise<number> {
    const db = await databaseService.getDb();
    const res = await db.run(
      'INSERT INTO mascotas (nombre, especie, raza, sexo, fecha_nacimiento, microchip, foto, notas, sync_status) VALUES (?,?,?,?,?,?,?,?,?)',
      [pet.nombre, pet.especie, pet.raza, pet.sexo, pet.fecha_nacimiento, pet.microchip, pet.foto, pet.notas, 'pending']
    );
    return res.changes?.lastId || 0;
  }

  async update(pet: Pet): Promise<void> {
    const db = await databaseService.getDb();
    await db.run(
      'UPDATE mascotas SET nombre=?, especie=?, raza=?, sexo=?, fecha_nacimiento=?, microchip=?, foto=?, notas=?, sync_status="pending" WHERE id=?',
      [pet.nombre, pet.especie, pet.raza, pet.sexo, pet.fecha_nacimiento, pet.microchip, pet.foto, pet.notas, pet.id]
    );
  }

  async delete(id: number): Promise<void> {
    const db = await databaseService.getDb();
    await db.run('UPDATE mascotas SET sync_status="deleted" WHERE id=?', [id]);
  }
}

export const petService = new PetService();

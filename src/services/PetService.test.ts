import { describe, it, expect, vi } from 'vitest';
import { petService } from '../services/PetService';
import { databaseService } from '../services/DatabaseService';

vi.mock('../services/DatabaseService', () => ({
  databaseService: {
    getDb: vi.fn().mockResolvedValue({
      query: vi.fn().mockResolvedValue({ values: [{ id: 1, nombre: 'Rex' }] }),
      run: vi.fn().mockResolvedValue({ changes: { lastId: 1 } }),
    }),
  },
}));

describe('PetService', () => {
  it('should create a pet', async () => {
    const pet = { nombre: 'Rex', especie: 'Perro', raza: 'Labrador', sexo: 'Macho', fecha_nacimiento: '2023-01-01', microchip: '123', foto: '', notas: '' };
    const id = await petService.create(pet);
    expect(id).toBe(1);
  });

  it('should get all pets', async () => {
    const pets = await petService.getAll();
    expect(pets).toHaveLength(1);
    expect(pets[0].nombre).toBe('Rex');
  });
});

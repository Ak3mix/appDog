import { describe, it, expect, vi } from 'vitest';
import { medicalEventService } from '../services/MedicalEventService';
import { databaseService } from '../services/DatabaseService';

vi.mock('../services/DatabaseService', () => ({
  databaseService: {
    getDb: vi.fn().mockResolvedValue({
      query: vi.fn().mockResolvedValue({ values: [{ id: 1, tipo: 'vacuna', detalle: 'Rabia', fecha: '2024-01-01' }] }),
      run: vi.fn().mockResolvedValue({ changes: { lastId: 1 } }),
    }),
  },
}));

describe('MedicalEventService', () => {
  it('should add a medical event', async () => {
    await medicalEventService.add(1, 'vacuna', { nota: 'Rabia' }, '2024-01-01');
    expect(databaseService.getDb).toHaveBeenCalled();
  });

  it('should get events for a pet', async () => {
    const events = await medicalEventService.getAll(1);
    expect(events).toHaveLength(1);
    expect(events[0].detalle).toBe('Rabia');
  });
});

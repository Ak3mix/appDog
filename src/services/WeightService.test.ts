import { describe, it, expect, vi } from 'vitest';
import { weightService } from '../services/WeightService';

vi.mock('../services/DatabaseService', () => ({
  databaseService: {
    getDb: vi.fn().mockResolvedValue({
      query: vi.fn().mockResolvedValue({ values: [{ avg: 10, max: 12, min: 8 }] }),
      run: vi.fn().mockResolvedValue({ changes: { lastId: 1 } }),
    }),
  },
}));

describe('WeightService', () => {
  it('should get stats', async () => {
    const stats = await weightService.getStats(1);
    expect(stats.avg).toBe(10);
    expect(stats.max).toBe(12);
    expect(stats.min).toBe(8);
  });
});

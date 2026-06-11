import { describe, it, expect } from 'vitest';
import { databaseService } from '../services/DatabaseService';

describe('DatabaseService', () => {
  it('should initialize and get connection', async () => {
    const db = await databaseService.getDb();
    expect(db).toBeDefined();
  });
});

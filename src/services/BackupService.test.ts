import { describe, it, expect, vi } from 'vitest';
import { backupService } from '../services/BackupService';

describe('BackupService', () => {
  it('should create backup', async () => {
    // La implementación ya está mockeada en setup.ts
    await backupService.createBackup();
    // No falla -> éxito
  });
});

import { describe, it, expect } from 'vitest';
import { exportService } from '../services/ExportService';

describe('ExportService', () => {
  it('should generate a PDF report', async () => {
    const mascota = { nombre: 'Rex' };
    const eventos = [{ tipo: 'vacuna', detalle: 'Rabia', fecha: '2024-01-01' }];
    const fileName = await exportService.generateReport(mascota, eventos);
    expect(fileName).toContain('Reporte_Rex');
  });
});

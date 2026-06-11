import { describe, it, expect } from 'vitest';
import { qrService } from '../services/QRService';

describe('QRService', () => {
  it('should generate valid QR JSON data', () => {
    const pet = { id: 1, nombre: 'Rex', microchip: '123' };
    const data = JSON.parse(qrService.generateQRData(pet));
    expect(data.nombre).toBe('Rex');
    expect(data.microchip).toBe('123');
  });
});

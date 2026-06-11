import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PerfilMascota from './PerfilMascota';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { petService } from '../services/PetService';
import { medicalEventService } from '../services/MedicalEventService';

// Mock de servicios
vi.mock('../services/PetService', () => ({
  petService: {
    getAll: vi.fn().mockResolvedValue([{ id: 1, nombre: 'Rex', especie: 'Perro', raza: 'Labrador' }]),
  },
}));

vi.mock('../services/MedicalEventService', () => ({
  medicalEventService: {
    getAll: vi.fn().mockResolvedValue([{ id: 1, tipo: 'vacuna', detalle: 'Rabia', fecha: '2024-01-01' }]),
  },
}));

describe('PerfilMascota Page', () => {
  it('should render pet profile', async () => {
    render(
      <MemoryRouter initialEntries={['/mascota/1']}>
        <Routes>
          <Route path="/mascota/:id" element={<PerfilMascota />} />
        </Routes>
      </MemoryRouter>
    );
    
    const petName = await screen.findByText('Rex');
    expect(petName).toBeInTheDocument();
  });
});

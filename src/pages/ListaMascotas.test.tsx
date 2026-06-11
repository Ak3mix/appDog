import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListaMascotas from './ListaMascotas';
import { BrowserRouter } from 'react-router-dom';

// Mock del servicio
vi.mock('../services/PetService', () => ({
  petService: {
    getAll: vi.fn().mockResolvedValue([{ id: 1, nombre: 'Rex', especie: 'Perro' }]),
  },
}));

describe('ListaMascotas Page', () => {
  it('should render pet list', async () => {
    render(
      <BrowserRouter>
        <ListaMascotas />
      </BrowserRouter>
    );
    
    // Esperar a que se renderice el nombre de la mascota tras la carga
    const petName = await screen.findByText('Rex');
    expect(petName).toBeInTheDocument();
  });
});

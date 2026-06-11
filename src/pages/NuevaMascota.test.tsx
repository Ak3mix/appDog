import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NuevaMascota from './NuevaMascota';
import { BrowserRouter } from 'react-router-dom';
import { petService } from '../services/PetService';

// Mock del servicio
vi.mock('../services/PetService', () => ({
  petService: {
    create: vi.fn().mockResolvedValue(1),
  },
}));

describe('NuevaMascota Page', () => {
  it('should create a new pet', async () => {
    render(
      <BrowserRouter>
        <NuevaMascota />
      </BrowserRouter>
    );
    
    // Rellenar formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Rex' } });
    fireEvent.change(screen.getByLabelText(/especie/i), { target: { value: 'Perro' } });
    
    // Enviar
    fireEvent.click(screen.getByText(/guardar/i));
    
    await waitFor(() => {
      expect(petService.create).toHaveBeenCalled();
    });
  });
});

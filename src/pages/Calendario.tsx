import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Chip } from '@mui/material';
import Layout from '../components/Layout';
import { medicalEventService } from '../services/MedicalEventService';

const Calendario = () => {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    // Cargar eventos (simplificado: traer de todas las mascotas o el usuario actual)
    // Para prototipo, mostraremos eventos de mascota 1 si existe
    const loadEventos = async () => {
      const data = await medicalEventService.getAll(1);
      setEventos(data);
    };
    loadEventos();
  }, []);

  return (
    <Layout title="Calendario">
      <Box sx={{ mb: 2 }}>
        {['Todos', 'Vacunas', 'Citas', 'Tratamientos'].map(tipo => (
          <Chip key={tipo} label={tipo} sx={{ mr: 1 }} />
        ))}
      </Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" textAlign="center">Octubre 2023</Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
            {/* Grid simplificado para el calendario */}
            {Array.from({ length: 31 }).map((_, i) => (
                <Grid item xs={1.7} key={i}>
                    <Box sx={{ border: '1px solid #ccc', p: 1, textAlign: 'center' }}>
                        {i + 1}
                    </Box>
                </Grid>
            ))}
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Calendario;

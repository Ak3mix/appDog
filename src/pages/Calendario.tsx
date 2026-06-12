import React from 'react';
import { Typography, Box, Paper, Grid, Chip } from '@mui/material';
import Layout from '../components/Layout';

const Calendario = () => {
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

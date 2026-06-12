import React, { useState } from 'react';
import { Typography, TextField, Grid, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, InputAdornment, Chip, Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import BiotechIcon from '@mui/icons-material/Biotech';
import Layout from '../components/Layout';

const Documentos = () => {
  const [filter, setFilter] = useState('Todo');

  return (
    <Layout title="Documentos">
      <TextField
        fullWidth
        placeholder="Buscar documentos..."
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ mb: 2, display: 'flex', gap: 1, overflowX: 'auto' }}>
        {['Todo', 'Recetas', 'Laboratorio', 'Informes'].map((f) => (
          <Chip key={f} label={f} onClick={() => setFilter(f)} color={filter === f ? 'primary' : 'default'} />
        ))}
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}><Card><CardContent><DescriptionIcon /> Prescripciones</CardContent></Card></Grid>
        <Grid item xs={6}><Card><CardContent><BiotechIcon /> Laboratorio</CardContent></Card></Grid>
      </Grid>

      <Typography variant="h6">Recientes</Typography>
      <List>
        <ListItem>
            <ListItemAvatar><Avatar><DescriptionIcon /></Avatar></ListItemAvatar>
            <ListItemText primary="Análisis Bioquímico" secondary="14 Oct 2023" />
        </ListItem>
      </List>
      
      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default Documentos;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { petService } from '../services/PetService';
import { medicalEventService } from '../services/MedicalEventService';
import { Pet } from '../types/db.types';
import Layout from '../components/Layout';

const PerfilMascota = () => {
  const { id } = useParams<{ id: string }>();
  const [mascota, setMascota] = useState<Pet | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, [id]);

  const loadData = async (mascotaId: number) => {
    setLoading(true);
    try {
      const allPets = await petService.getAll();
      const foundPet = allPets.find(p => p.id === mascotaId);
      setMascota(foundPet || null);
      
      const allEventos = await medicalEventService.getAll(mascotaId);
      setEventos(allEventos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout title="Cargando..."><CircularProgress /></Layout>;
  if (!mascota) return <Layout title="Error"><Typography>Mascota no encontrada</Typography></Layout>;

  return (
    <Layout title={mascota.nombre}>
      <Typography variant="h6" color="textSecondary" gutterBottom>{mascota.especie} - {mascota.raza}</Typography>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>Historial Médico</Typography>
        {eventos.length === 0 ? (
            <Typography variant="body2" color="textSecondary">No hay eventos registrados.</Typography>
        ) : (
            <List>
            {eventos.map((ev) => (
                <ListItem key={ev.id}>
                <ListItemText primary={ev.detalle.nota || ev.detalle} secondary={`${ev.tipo} - ${ev.fecha}`} />
                </ListItem>
            ))}
            </List>
        )}
      </Box>

      <Button variant="contained" onClick={() => navigate(`/mascota/${id}/nuevo-evento`)} sx={{ mt: 2, mr: 1 }}>Añadir Evento</Button>
      <Button variant="outlined" onClick={() => navigate('/mascotas')} sx={{ mt: 2 }}>Volver</Button>
    </Layout>
  );
};

export default PerfilMascota;


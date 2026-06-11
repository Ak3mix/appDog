import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Fab, ListItemSecondaryAction, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/PetService';
import { Pet } from '../types/db.types';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const ListaMascotas = () => {
  const [mascotas, setMascotas] = useState<Pet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMascotas();
  }, []);

  const loadMascotas = async () => {
    const data = await petService.getAll();
    setMascotas(data);
  };

  return (
    <Layout title="PetHealth">
      {mascotas.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
          No tienes mascotas registradas aún.
        </Typography>
      ) : (
        <List>
          {mascotas.map((pet) => (
            <ListItem key={pet.id} onClick={() => navigate(`/mascota/${pet.id}`)} button>
              <ListItemAvatar>
                <Avatar src={pet.foto} />
              </ListItemAvatar>
              <ListItemText primary={pet.nombre} secondary={pet.especie} />
              <ListItemSecondaryAction>
                {pet.sync_status === 'pending' && (
                    <Tooltip title="Pendiente de sincronizar">
                        <CloudOffIcon fontSize="small" color="action" />
                    </Tooltip>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Fab color="primary" aria-label="add" onClick={() => navigate('/nueva-mascota')} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default ListaMascotas;


import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Switch, Divider, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import BackupIcon from '@mui/icons-material/Backup';
import InfoIcon from '@mui/icons-material/Info';
import Layout from '../components/Layout';
import { backupService } from '../services/BackupService';

const Configuracion = () => {
  const handleBackup = async () => {
    await backupService.createBackup();
    alert('Backup creado en documentos');
  };

  return (
    <Layout title="Configuración">
      <List>
        <ListItem>
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          <ListItemText primary="Notificaciones" />
          <Switch defaultChecked />
        </ListItem>
        <ListItem>
          <ListItemIcon><LanguageIcon /></ListItemIcon>
          <ListItemText primary="Idioma" secondary="Español" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon><BackupIcon /></ListItemIcon>
          <ListItemText primary="Copia de Seguridad" />
          <Button onClick={handleBackup} variant="outlined">Crear Backup</Button>
        </ListItem>
        <ListItem>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Acerca de" secondary="PetHealth v1.0.0" />
        </ListItem>
      </List>
    </Layout>
  );
};

export default Configuracion;

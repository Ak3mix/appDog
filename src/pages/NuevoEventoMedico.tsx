import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { medicalEventService } from '../services/MedicalEventService';
import Layout from '../components/Layout';

const tiposEvento = ['Vacuna', 'Tratamiento', 'Diagnóstico', 'Cita'];

const NuevoEventoMedico = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { tipo: 'Vacuna', detalle: '', fecha: new Date().toISOString().split('T')[0] }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await medicalEventService.add(parseInt(id!), data.tipo, { nota: data.detalle }, data.fecha);
      navigate(`/mascota/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Nuevo Evento Médico">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller name="tipo" control={control} render={({ field }) => (
          <TextField {...field} select fullWidth label="Tipo" margin="normal">
            {tiposEvento.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        )} />
        <Controller name="fecha" control={control} render={({ field }) => (
          <TextField {...field} type="date" fullWidth label="Fecha" margin="normal" InputLabelProps={{ shrink: true }} />
        )} />
        <Controller name="detalle" control={control} render={({ field }) => (
          <TextField {...field} fullWidth label="Detalles/Observaciones" multiline rows={4} margin="normal" />
        )} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </Box>
    </Layout>
  );
};

export default NuevoEventoMedico;

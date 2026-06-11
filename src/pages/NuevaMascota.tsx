import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/PetService';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '../components/Layout';
import { useState } from 'react';

const petSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  especie: z.string().min(1, "La especie es obligatoria"),
  raza: z.string(),
  sexo: z.string(),
  fecha_nacimiento: z.string(),
  microchip: z.string(),
  notas: z.string(),
});

const NuevaMascota = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: { nombre: '', especie: '', raza: '', sexo: '', fecha_nacimiento: '', microchip: '', notas: '' }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await petService.create({ ...data, foto: '' });
      navigate('/mascotas');
    } catch (error) {
      console.error(error);
      // Aquí se debería implementar un Snackbar de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Nueva Mascota">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller name="nombre" control={control} render={({ field }) => (
          <TextField {...field} fullWidth label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} margin="normal" />
        )} />
        <Controller name="especie" control={control} render={({ field }) => (
          <TextField {...field} fullWidth label="Especie" error={!!errors.especie} helperText={errors.especie?.message} margin="normal" />
        )} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </Box>
    </Layout>
  );
};

export default NuevaMascota;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaMascotas from '../pages/ListaMascotas';
import NuevaMascota from '../pages/NuevaMascota';
import PerfilMascota from '../pages/PerfilMascota';
import NuevoEventoMedico from '../pages/NuevoEventoMedico';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaMascotas />} />
        <Route path="/mascotas" element={<ListaMascotas />} />
        <Route path="/mascota/:id" element={<PerfilMascota />} />
        <Route path="/mascota/:id/nuevo-evento" element={<NuevoEventoMedico />} />
        <Route path="/nueva-mascota" element={<NuevaMascota />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

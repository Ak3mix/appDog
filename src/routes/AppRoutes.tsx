import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaMascotas from '../pages/ListaMascotas';
import NuevaMascota from '../pages/NuevaMascota';
import PerfilMascota from '../pages/PerfilMascota';
import NuevoEventoMedico from '../pages/NuevoEventoMedico';
import Documentos from '../pages/Documentos';
import Calendario from '../pages/Calendario';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaMascotas />} />
        <Route path="/mascotas" element={<ListaMascotas />} />
        <Route path="/mascota/:id" element={<PerfilMascota />} />
        <Route path="/mascota/:id/nuevo-evento" element={<NuevoEventoMedico />} />
        <Route path="/nueva-mascota" element={<NuevaMascota />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

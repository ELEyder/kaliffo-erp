import { Routes, Route } from 'react-router-dom';
import TiendasView from '@V/Administrativo/Tiendas/TiendasView';
import TiendaView from '@V/Administrativo/Tiendas/TiendaView';

const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<TiendasView />} />
        <Route path="/:id" element={<TiendaView />} />
    </Routes>
);

export default TiendasRoutes;

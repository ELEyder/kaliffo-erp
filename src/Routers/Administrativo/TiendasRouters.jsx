import { Routes, Route } from 'react-router-dom';
import TiendasView from '@V/Tiendas/TiendasView';
import TiendaView from '@V/Tiendas/TiendaView';

const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<TiendasView />} />
        <Route path="/:id" element={<TiendaView />} />
    </Routes>
);

export default TiendasRoutes;

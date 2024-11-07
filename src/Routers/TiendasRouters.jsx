import { Routes, Route } from 'react-router-dom';
import TiendasView from '../Views/Tiendas/TiendasView';
import TiendaView from '../Views/Tiendas/TiendaView';

const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<TiendasView />} />
        <Route path="/:id" element={<TiendaView />} />
    </Routes>
);

export default TiendasRoutes;

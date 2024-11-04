import { Routes, Route } from 'react-router-dom';
import Tiendas from '../Components/Tiendas/Tiendas';
import Tienda from '../Components/Tienda/Tienda';

const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<Tiendas />} />
        <Route path="/:id" element={<Tienda />} />
    </Routes>
);

export default TiendasRoutes;

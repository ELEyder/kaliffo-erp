import { Routes, Route } from 'react-router-dom';
import Tiendas from './Tiendas';
import Tienda from './Tienda';

const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<Tiendas />} />
        <Route path="/:id" element={<Tienda />} />
    </Routes>
);

export default TiendasRoutes;

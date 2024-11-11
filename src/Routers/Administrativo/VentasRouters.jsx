import { Routes, Route } from 'react-router-dom';
import VentasView from '../../Views/Ventas/VentasView';


const TiendasRoutes = () => (
    <Routes>
        <Route path="/" element={<VentasView />} />
        <Route path="/:id" element={<TrabajadorView />} />
    </Routes>
);

export default TiendasRoutes;

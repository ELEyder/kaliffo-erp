import { Routes, Route } from 'react-router-dom';
import GenerarVentaView from '@V/Ventas/GenerarVenta/GenerarVentaView';


const LotesRouters = () => (
    <Routes>
        <Route path="/:tipo" element={<GenerarVentaView />} />
    </Routes>
);

export default LotesRouters;

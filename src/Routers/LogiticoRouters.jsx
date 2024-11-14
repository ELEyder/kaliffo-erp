import { Routes, Route } from 'react-router-dom';
import ComprasView from "@V/Logistico/Compras/ComprasView";


const LogiticoRouters = () => (
    <Routes>
        <Route path="/historial" element={<ComprasView />} />
        <Route path="/mover" element={<ComprasView />} />
        <Route path="/compras" element={<ComprasView />} />
    </Routes>
);

export default LogiticoRouters;

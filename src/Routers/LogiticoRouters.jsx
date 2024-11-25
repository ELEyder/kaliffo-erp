import { Routes, Route } from 'react-router-dom';
import ComprasView from "@V/Logistico/Compras/ComprasView";
import AlmacenProductos from "@V/Logistico/AlmacenProductos/AlmacenProductos";


const LogiticoRouters = () => (
    <Routes>
        <Route path="/historial" element={<ComprasView />} />
        <Route path="/mover" element={<ComprasView />} />
        <Route path="/compras" element={<ComprasView />} />
        <Route path="/almacen_productos" element={<AlmacenProductos/>} />
    </Routes>
);

export default LogiticoRouters;

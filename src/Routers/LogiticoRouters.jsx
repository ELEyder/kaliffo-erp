import { Routes, Route } from 'react-router-dom';
import ComprasView from "@V/Logistico/Compras/ComprasView";


const LogiticoRouters = () => (
    <Routes>
        <Route path="/" element={<ComprasView />} />
    </Routes>
);

export default LogiticoRouters;

import { Routes, Route } from 'react-router-dom';
import Trabajadores from '../Components/Trabajadores/Trabajadores';
import Trabajador from '../Components/Trabajador/Trabajador';

const TrabajadoresRouters = () => (
    <Routes>
        <Route path="/tipo/:tipo_trabajador" element={<Trabajadores />} />
        <Route path="/:id" element={<Trabajador />} />
    </Routes>
);

export default TrabajadoresRouters;

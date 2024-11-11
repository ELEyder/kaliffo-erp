import { Routes, Route } from 'react-router-dom';
import TrabajadoresView from '@V/Administrativo/Trabajadores/TrabajadoresView';
import TrabajadorView from '@V/Administrativo/Trabajadores/TrabajadorView';


const TrabajadoresRouters = () => (
    <Routes>
        <Route path="/tipo/:tipo" element={<TrabajadoresView />} />
        <Route path="/:id" element={<TrabajadorView />} />
    </Routes>
);

export default TrabajadoresRouters;

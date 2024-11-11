import { Routes, Route } from 'react-router-dom';
import TrabajadoresView from '../../Views/Trabajadores/TrabajadoresView';
import TrabajadorView from '../../Views/Trabajadores/TrabajadorView';


const TrabajadoresRouters = () => (
    <Routes>
        <Route path="/tipo/:tipo" element={<TrabajadoresView />} />
        <Route path="/:id" element={<TrabajadorView />} />
    </Routes>
);

export default TrabajadoresRouters;

import { Routes, Route } from 'react-router-dom';
import Productos from '../Components/Productos/Productos';
import Producto from '../Components/Producto/Producto';

const ProductosRouters = () => (
    <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/:id" element={<Producto />} />
    </Routes>
);

export default ProductosRouters;

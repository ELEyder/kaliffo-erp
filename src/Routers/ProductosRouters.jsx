import { Routes, Route } from 'react-router-dom';
import ProductosView from '../Views/Productos/ProductosView';
import ProductoView from '../Views/Productos/ProductoView';

const ProductosRouters = () => (
    <Routes>
        <Route path="/" element={<ProductosView />} />
        <Route path="/:id" element={<ProductoView />} />
    </Routes>
);

export default ProductosRouters;

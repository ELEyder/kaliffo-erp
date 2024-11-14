import { Routes, Route } from 'react-router-dom';
import ProductosView from '@V/Administrativo/Productos/ProductosView';
import ProductoView from '@V/Administrativo/Productos/ProductoView';

const ProductosRouters = () => (
    <Routes>
        <Route path="/" element={<ProductosView />} />
        <Route path="/:id" element={<ProductoView />} />
    </Routes>
);

export default ProductosRouters;

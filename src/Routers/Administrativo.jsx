import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const VentasView = lazy(() => import("@V/Administrativo/Ventas/VentasView"));
const TrabajadoresView = lazy(() => import("@V/Administrativo/Trabajadores/TrabajadoresView"));
const TrabajadorView = lazy(() => import("@V/Administrativo/Trabajadores/TrabajadorView"));
const TiendasView = lazy(() => import("@V/Administrativo/Tiendas/TiendasView"));
const TiendaView = lazy(() => import("@V/Administrativo/Tiendas/TiendaView"));
const ProductosView = lazy(() => import("@V/Administrativo/Productos/ProductosView"));
const ProductoView = lazy(() => import("@V/Administrativo/Productos/ProductoView"));

const Administrativo = () => (
    <>

        <Route path="/trabajadores/tipo/:tipoTrabajador" element={<TrabajadoresView />} />
        <Route path="/trabajadores/:id" element={<TrabajadorView />} />

        <Route path="/tiendas" element={<TiendasView />} />
        <Route path="/tiendas/:id" element={<TiendaView />} />

        <Route path="/productos" element={<ProductosView />} />
        <Route path="/productos/:id" element={<ProductoView />} />

        <Route path="/ventas/:tipo" element={<VentasView />} />

    </>
);

export default Administrativo;

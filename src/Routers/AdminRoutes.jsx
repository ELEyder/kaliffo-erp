import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading de componentes
const VentasView = lazy(() => import("@V/Administrativo/Ventas/VentasView"));
const TrabajadoresView = lazy(() => import("@V/Administrativo/Trabajadores/TrabajadoresView"));
const TrabajadorView = lazy(() => import("@V/Administrativo/Trabajadores/TrabajadorView"));
const TiendasView = lazy(() => import("@V/Administrativo/Tiendas/TiendasView"));
const TiendaView = lazy(() => import("@V/Administrativo/Tiendas/TiendaView"));
const ProductosView = lazy(() => import("@V/Administrativo/Productos/ProductosView"));
const ProductoView = lazy(() => import("@V/Administrativo/Productos/ProductoView"));

// Componente de carga
const Loading = () => <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}}><img src="/img/loading/loading.gif"/> </div>;

const AdminRoutes = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            {/* Rutas de Ventas */}
            <Route path="/ventas" element={<VentasView />} />

            {/* Rutas de Trabajadores */}
            <Route path="/trabajadores/tipo/:tipo" element={<TrabajadoresView />} />
            <Route path="/trabajadores/:id" element={<TrabajadorView />} />

            {/* Rutas de Tiendas */}
            <Route path="/tiendas" element={<TiendasView />} />
            <Route path="/tiendas/:id" element={<TiendaView />} />

            {/* Rutas de Productos */}
            <Route path="/productos" element={<ProductosView />} />
            <Route path="/productos/:id" element={<ProductoView />} />
        </Routes>
    </Suspense>
);

export default AdminRoutes;

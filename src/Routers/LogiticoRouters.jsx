import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading de componentes
const ComprasView = lazy(() => import("@V/Logistico/Compras/ComprasView"));
const AlmacenProductos = lazy(() => import("@V/Logistico/AlmacenProductos/AlmacenProductos"));

// Componente de carga
const Loading = () => <div>Cargando...</div>;

const LogiticoRouters = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            <Route path="/historial" element={<ComprasView />} />
            <Route path="/mover" element={<ComprasView />} />
            <Route path="/compras" element={<ComprasView />} />
            <Route path="/almacen_productos" element={<AlmacenProductos />} />
        </Routes>
    </Suspense>
);

export default LogiticoRouters;

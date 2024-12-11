import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading del componente
const GenerarVentaView = lazy(() => import("@V/Ventas/GenerarVenta/GenerarVentaView"));

// Componente de carga
const Loading = () => <div>Cargando...</div>;

const LotesRouters = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            <Route path="/:tipo" element={<GenerarVentaView />} />
        </Routes>
    </Suspense>
);

export default LotesRouters;

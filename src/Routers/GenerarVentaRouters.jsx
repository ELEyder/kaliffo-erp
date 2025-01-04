import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading del componente
const GenerarVentaView = lazy(() => import("@V/Ventas/GenerarVenta/GenerarVentaView"));

// Componente de carga
const Loading = () => <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}}><img src="/img/loading/loading.gif"/> </div>;

const LotesRouters = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            <Route path="/:tipo" element={<GenerarVentaView />} />
        </Routes>
    </Suspense>
);

export default LotesRouters;

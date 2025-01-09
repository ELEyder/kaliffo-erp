import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading de componentes
const TelasView = lazy(() => import("@V/Produccion/Telas/TelasView"));
const TelaView = lazy(() => import("@V/Produccion/Telas/TelaView"));
const LotesView = lazy(() => import("@V/Produccion/Lotes/LotesView"));
const LoteView = lazy(() => import("@V/Produccion/Lotes/LoteView"));

// Componente de carga
const Loading = () => <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}}><img src="/img/loading/loading.gif"/> </div>;

const ProdRoutes = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            {/* Rutas de Telas */}
            <Route path="/telas" element={<TelasView />} />
            <Route path="/telas/:tipo" element={<TelaView />} />
            
            {/* Rutas de Lotes */}
            <Route path="/lotes" element={<LotesView />} />
            <Route path="/lotes/:id" element={<LoteView />} />
        </Routes>
    </Suspense>
);

export default ProdRoutes;

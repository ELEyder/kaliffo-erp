import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const TelasView = lazy(() => import("@V/Produccion/Telas/TelasView"));
const TelaView = lazy(() => import("@V/Produccion/Telas/TelaView"));
const LotesView = lazy(() => import("@V/Produccion/Lotes/LotesView"));
const LoteView = lazy(() => import("@V/Produccion/Lotes/LoteView"));

const produccion = () => (
        <>
            {/* Rutas de Telas */}
            <Route path="/telas" element={<TelasView />} />
            <Route path="/telas/:tipo" element={<TelaView />} />
            
            {/* Rutas de Lotes */}
            <Route path="/lotes" element={<LotesView />} />
            <Route path="/lotes/:id" element={<LoteView />} />
        </>
);

export default produccion;

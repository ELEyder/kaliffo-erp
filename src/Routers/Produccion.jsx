import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Telas = lazy(() => import("../Views/Telas"));
const Tela = lazy(() => import("../Views/Tela"));
const Lotes = lazy(() => import("../Views/Lotes"));
const Lote = lazy(() => import("../Views/Lote"));

const produccion = () => (
        <>
            {/* Rutas de Telas */}
            <Route path="/telas" element={<Telas />} />
            <Route path="/telas/:tipo" element={<Tela />} />
            
            {/* Rutas de Lotes */}
            <Route path="/lotes" element={<Lotes />} />
            <Route path="/lotes/:id" element={<Lote />} />
        </>
);

export default produccion;

import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Telas = lazy(() => import("../Views/Telas"));
const Tela = lazy(() => import("../Views/Tela"));
const Layout = lazy(() => import("../Views/Lote/layout"));
const Lotes = lazy(() => import("../Views/Lotes"));
const Cortes = lazy(() => import("../Components/produccion/lotes/CortesTable"));

const produccion = () => (
    <>
        {/* Rutas de Telas */}
        <Route path="/telas" element={<Telas />} />
        <Route path="/telas/:tipo" element={<Tela />} />

        {/* Rutas de Lotes */}
        <Route path="/lotes" element={<Lotes />} />
        <Route path="/lotes/:id" element={<Layout />}>
            <Route path="corte" element={<Cortes />} />
            <Route path="lavanderia" element={<Lotes />} />
            <Route path="acabados" element={<Lotes />} />
            <Route path="almacen" element={<Lotes />} />
        </Route>
    </>
);

export default produccion;

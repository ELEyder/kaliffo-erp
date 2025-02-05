import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Almacenes = lazy(() => import("../Views/Almacenes"));
const Almacen = lazy(() => import("../Views/Almacen"));
const ComprasView = lazy(() => import("../Views/Logistico/Compras"));
const MovimientosGenerar = lazy(() => import("../Views/Logistico/MovimientoMercaderia"));

const logistico = () => (
    <>
        {/* Rutas para almacen productos */}
        <Route path="/almacen" element={<Almacenes />} />
        <Route path="/almacen/:id" element={<Almacen />} />

        <Route path="/movimientos_generar" element={< MovimientosGenerar />} />
        <Route path="/movimientos_historial" element={<ComprasView />} />
        <Route path="/compras" element={<ComprasView />} />

    </>
);

export default logistico;

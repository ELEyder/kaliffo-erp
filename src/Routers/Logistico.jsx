import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Almacenes = lazy(() => import("../Views/Almacenes"));
const Almacen = lazy(() => import("../Views/Almacen"));
const Compras = lazy(() => import("../Views/Compras"));
const Generar = lazy(() => import("../Views/Movimientos/Generar"));
const Historial = lazy(() => import("../Views/Movimientos/Historial"));
const MovimientosDetalle = lazy(()=>import("../Views/Movimientos/Detalle"))
const logistico = () => (
    <>
        {/* Rutas para almacen productos */}
        <Route path="/almacen" element={<Almacenes />} />
        <Route path="/almacen/:id" element={<Almacen />} />

        <Route path="/movimientos/generar" element={< Generar />} />
        <Route path="/movimientos/historial" element={<Historial />} />
        <Route path="/movimientos/historial/:tipo" element={<MovimientosDetalle />} />
        <Route path="/compras" element={<Compras />} />

    </>
);

export default logistico;

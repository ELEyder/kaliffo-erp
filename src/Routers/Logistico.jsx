import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Almacenes = lazy(() => import("../Views/Almacenes"));
const Almacen = lazy(() => import("../Views/Almacen"));
const Compras = lazy(() => import("../Views/Compras"));
const Historial = lazy(() => import("../Views/Movimientos/Historial"));
const Mercaderia = lazy(() => import("../Views/Movimientos/Mercaderia"));

const logistico = () => (
    <>
        {/* Rutas para almacen productos */}
        <Route path="/almacen" element={<Almacenes />} />
        <Route path="/almacen/:id" element={<Almacen />} />

        <Route path="/movimientos/generar" element={< Mercaderia />} />
        <Route path="/movimientos/historial" element={<Historial />} />
        <Route path="/compras" element={<Compras />} />

    </>
);

export default logistico;

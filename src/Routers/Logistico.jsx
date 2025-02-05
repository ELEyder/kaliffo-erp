import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const ComprasView = lazy(() => import("@V/Logistico/Compras/ComprasView"));
const MovimientosGenerar = lazy(() => import("@V/Logistico/MovimientoMercaderia/MovimientoMercaderiaGenerar"))
const AlmacenProductos = lazy(() => import("@V/Logistico/AlmacenProductos/AlmacenProductos"));
const Almacen = lazy(() => import("@V/Logistico/AlmacenProductos/Almacen"))

const logistico = () => (
    <>
        <Route path="/movimientos_historial" element={<ComprasView />} />
        <Route path="/movimientos_generar" element={< MovimientosGenerar />} />
        <Route path="/compras" element={<ComprasView />} />

        {/* Rutas para almacen productos */}
        <Route path="/almacen_productos" element={<AlmacenProductos />} />
        <Route path="/almacen_productos/:id" element={<Almacen />} />
    </>
);

export default logistico;

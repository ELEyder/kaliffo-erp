import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading del componente
const GenerarVentaView = lazy(() => import("@V/Comercial/GenerarVenta/GenerarVentaView"));

const Ventas = () => (
    <>
        <Route path="/venta/generar/:tipo" element={<GenerarVentaView />} />
    </>
);

export default Ventas;

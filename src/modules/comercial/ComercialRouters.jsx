import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading del componente
const Generar = lazy(() => import("../../Views/Venta/Generar"));

const ComercialRouters = () => (
    <>
        <Route path="/venta/generar/:tipo" element={<Generar />} />
    </>
);

export default ComercialRouters;

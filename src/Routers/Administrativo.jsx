import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de componentes
const Trabajadores = lazy(() => import("../Views/Trabajadores"));
const Trabajador = lazy(() => import("../Views/Trabajador"));
const Tiendas = lazy(() => import("../Views/Tiendas"));
const Tienda = lazy(() => import("../Views/Tienda"));
const Productos = lazy(() => import("../Views/Productos"));
const Producto = lazy(() => import("../Views/Producto"));
const Ventas = lazy(() => import("../Views/Ventas"));

const Administrativo = () => (
    <>
        <Route path="/trabajadores/tipo/:tipoTrabajador" element={<Trabajadores />} />
        <Route path="/trabajadores/:id" element={<Trabajador />} />

        <Route path="/tiendas" element={<Tiendas />} />
        <Route path="/tiendas/:id" element={<Tienda />} />

        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<Producto />} />

        <Route path="/ventas/:tipo" element={<Ventas />} />
    </>
);

export default Administrativo;

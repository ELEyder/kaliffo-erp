import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

// Lazy loading de componentes
const Trabajadores = lazy(() => import("./pages/Trabajadores"));
const Trabajador = lazy(() => import("./pages/Trabajador"));
const Tiendas = lazy(() => import("./pages/Tiendas"));
const Tienda = lazy(() => import("./pages/Tienda"));
const Productos = lazy(() => import("./pages/Productos"));
const Producto = lazy(() => import("../../Views/Producto"));
const Ventas = lazy(() => import("../../Views/Ventas"));

const AdministrativoRouters = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/trabajadores/" element={<Trabajadores />} />
      <Route path="/trabajadores/:id" element={<Trabajador />} />
      <Route path="/tiendas" element={<Tiendas />} />
      <Route path="/tiendas/:id" element={<Tienda />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<Producto />} />
      <Route path="/ventas/:tipo" element={<Ventas />} />
    </Routes>
  </Suspense>
);

export default AdministrativoRouters;

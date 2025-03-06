import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

// Lazy loading de componentes
const Almacen = lazy(() => import("./pages/Almacen"));
const Almacenes = lazy(() => import("./pages/Almacenes"));
const Compras = lazy(() => import("./pages/Compras"));
const Generar = lazy(() => import("./pages/Movimientos/Generar"));
const Historial = lazy(() => import("./pages/Movimientos/Historial"));
const ErrorView = lazy(() => import("../../pages/Error/ErrorView"));

const LogisticoRouters = () => (
  <>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/almacen" element={<Almacenes />} />
        <Route path="/almacen/:id" element={<Almacen />} />

        <Route path="/movimientos/generar" element={<Generar />} />
        <Route path="/movimientos/historial" element={<Historial />} />

        <Route path="/compras" element={<Compras />} />

      <Route path="*" element={<ErrorView />} />

      </Routes>
    </Suspense>
  </>
);

export default LogisticoRouters;

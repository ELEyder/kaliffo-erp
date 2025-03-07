import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "../../components/UI";

// Lazy loading de componentes
const Telas = lazy(() => import("./pages/Telas"));
const Tela = lazy(() => import("./pages/Tela"));
const Layout = lazy(() => import("./pages/Lote/layout"));
const Lotes = lazy(() => import("./pages/Lotes"));
const Cortes = lazy(() => import("../../components/produccion/lotes/CortesTable"));
const Lavanderia = lazy(() => import("../../components/produccion/lotes/LavanderiaTable"));
const Acabado = lazy(() => import("../../components/produccion/lotes/AcabadoTable"));
const Almacen = lazy(() => import("./pages/Lote/Almacen"));
const ErrorView = lazy(() => import("../../pages/Error/ErrorView"));

const ProduccionRouters = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* Rutas de Telas */}
      <Route path="/telas" element={<Telas />} />
      <Route path="/telas/:tipo" element={<Tela />} />
{/* 
        <Route path="/lotes" element={<Lotes />} />
        <Route path="/lotes/:id" element={<Layout />}>
            <Route path="corte" element={<Cortes />} />
            <Route path="lavanderia" element={<Lavanderia />} />
            <Route path="acabados" element={<Acabado />} />
            <Route path="almacen" element={<Almacen />} />
        </Route> */}
      <Route path="*" element={<ErrorView />} />

    </Routes>
  </Suspense>
);

export default ProduccionRouters;

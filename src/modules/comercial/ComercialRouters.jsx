import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";


// Lazy loading del componente
const Generar = lazy(() => import("./pages/Venta/Generar"));
const ErrorView = lazy(() => import("../../Views/Error/ErrorView"));

const ComercialRouters = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/venta/generar/:tipo" element={<Generar />} />
      <Route path="*" element={<ErrorView />} />

    </Routes>
  </Suspense>
);

export default ComercialRouters;

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdministrativoRouters from "../modules/administrativo/AdministrativoRouters";
import LogisticoRouters from "../modules/logistico/LogisticoRouters";
import ProduccionRouters from "../modules/logistico/LogisticoRouters";
import ComercialRouters from "../modules/logistico/LogisticoRouters";

import Loading from "../Components/Loading/Loading";
import Layout from "../layouts/Layout";

const LoginView = lazy(() => import("../Views/Login/LoginView"));
const ErrorView = lazy(() => import("../Views/Error/ErrorView"));
const TestView = lazy(() => import("../Views/Test"));

export const Routing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route element={<Layout />}>
          <Route path="/administrativo/*" element={<AdministrativoRouters />} />
          <Route path="/logistico/*" element={<LogisticoRouters />} />
          <Route path="/produccion/*" element={<ProduccionRouters />} />
          <Route path="/comercial/*" element={<ComercialRouters />} />
        </Route>
        <Route path="*" element={<ErrorView />} />
        <Route path="/test" element={<TestView />} />
      </Routes>
    </Suspense>
  );
};

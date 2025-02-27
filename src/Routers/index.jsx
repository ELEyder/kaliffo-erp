import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdministrativoRouters from "../modules/administrativo/AdministrativoRouters";
import Logistico from "./logistico";
import Produccion from "./Produccion";
import Comercial from "./Comercial";
import Loading from "../Components/Loading/Loading";
import Layout from "../layouts/Layout";
// Lazy loading de componentes
const LoginView = lazy(() => import("../Views/Login/LoginView"));
const ErrorView = lazy(() => import("../Views/Error/ErrorView"));
const TestView = lazy(() => import("../Views/Test"));

// Componente de carga (puedes personalizarlo)


export const Routing = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route element={<Layout />}>
                    <Route path="*" element={<AdministrativoRouters />} />
                    {Logistico()}
                    {Produccion()}
                    {Comercial()}
                </Route>
                <Route path="*" element={<ErrorView />} />
                <Route path="/test" element={<TestView />} />
            </Routes>
        </Suspense>
    );
};

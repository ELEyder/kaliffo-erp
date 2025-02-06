import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Administrativo from "./Routers/administrativo";
import Logistico from "./Routers/logistico";
import Produccion from "./Routers/produccion";
import Comercial from "./Routers/Comercial";
import Loading from "./Components/Loading/Loading";
// Lazy loading de componentes
const Layout = lazy(() => import("./Layout"));
const LoginView = lazy(() => import("./Views/Login/LoginView"));
const ErrorView = lazy(() => import("./Views/Error/ErrorView"));
const TestView = lazy(() => import("./Views/Test"));

// Componente de carga (puedes personalizarlo)


export const Routing = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route element={<Layout />}>
                    {Administrativo()}
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

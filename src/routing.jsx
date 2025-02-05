import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Administrativo from "./Routers/administrativo";
import Logistico from "./Routers/logistico";
import Produccion from "./Routers/produccion";
import Ventas from "./Routers/Ventas";

// Lazy loading de componentes
const LoginView = lazy(() => import("./Views/Login/LoginView"));
const ErrorView = lazy(() => import("./Shared/Error/ErrorView"));
const Plantilla = lazy(() => import("./Shared/Plantilla"));
const TestView = lazy(() => import("./Views/TestView"));

const GenerarVentaRouters = lazy(() => import("./Routers/Ventas"));

// Componente de carga (puedes personalizarlo)
const Loading = () => <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}}><img src="/img/loading/loading.gif"/> </div>;

export const Routing = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route element={<Plantilla />}>
                    {Administrativo()}
                    {Logistico()}
                    {Produccion()}
                    {Ventas()}
                    <Route path="/generar/venta/*" element={<GenerarVentaRouters />} />
                </Route>
                <Route path="*" element={<ErrorView />} />
                <Route path="/test" element={<TestView />} />
            </Routes>
        </Suspense>
    );
};

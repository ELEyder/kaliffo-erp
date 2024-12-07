import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy loading de componentes
const LoginView = lazy(() => import("./Shared/Login/LoginView"));
const ErrorView = lazy(() => import("./Shared/Error/ErrorView"));
const Plantilla = lazy(() => import("./Shared/Plantilla"));

const GenerarVentaRouters = lazy(() => import("./Routers/GenerarVentaRouters"));
const AdminRoutes = lazy(() => import("./Routers/AdminRoutes"));
const LogiticoRouters = lazy(() => import("./Routers/LogiticoRouters"));
const ProdRoutes = lazy(() => import("./Routers/ProdRoutes"));

// Componente de carga (puedes personalizarlo)
const Loading = () => <div>Cargando...</div>;

export const Routing = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route element={<Plantilla />}>
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="/logistico/*" element={<LogiticoRouters />} />
                    <Route path="/prod/*" element={<ProdRoutes />} />
                    <Route path="/generar/venta/*" element={<GenerarVentaRouters />} />
                </Route>
                <Route path="*" element={<ErrorView />} />
            </Routes>
        </Suspense>
    );
};

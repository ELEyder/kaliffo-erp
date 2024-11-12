import { Route,Routes } from "react-router-dom";
import LoginView from "./Shared/Login/LoginView";
import TrabajadoresRouters from "./Routers/Administrativo/TrabajadoresRouters";
import TiendasRouters from "./Routers/Administrativo/TiendasRouters";
import ProductosRouters from "./Routers/Administrativo/ProductosRouters";
import VentasView from "@V/Administrativo/Ventas/VentasView"
import ErrorView from "./Shared/Error/ErrorView"
import ComprasView from "@V/Logistico/Compras/ComprasView";
import TelasRouters from "./Routers/Produccion/TelasRouters";
import LotesRouters from "./Routers/Produccion/LotesRouters";
import Plantilla from "./Shared/Plantilla";
import GenerarVentaRouters from "./Routers/Ventas/GenerarVentaRouters";
import AdminRoutes from "./Routers/AdminRoutes";
import LogiticoRouters from "./Routers/LogiticoRouters";
import ProdRoutes from "./Routers/ProdRoutes";

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            <Route element={<Plantilla />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/logistico/*" element={<LogiticoRouters />} />
                <Route path="/prod/*" element={<ProdRoutes />} />

                <Route path="/generar/venta/*" element={<GenerarVentaRouters/>} />
            </Route>
            <Route path="*" element={<ErrorView />} />
        </Routes>
    )
}
import { Route,Routes } from "react-router-dom";
import LoginView from "./Shared/Login/LoginView";
import TrabajadoresRouters from "./Routers/Administrativo/TrabajadoresRouters";
import TiendasRouters from "./Routers/Administrativo/TiendasRouters";
import ProductosRouters from "./Routers/Administrativo/ProductosRouters";
import Ventas from "./Views/Administrativo/Ventas/Ventas"
import ErrorView from "./Shared/Error/ErrorView"
import ComprasView from "./Views/Logistico/Compras/ComprasView";
import TelasRouters from "./Routers/Produccion/TelasRouters";
import LotesRouters from "./Routers/Produccion/LotesRouters";
import Plantilla from "./Shared/Plantilla";
import GenerarVentas from "./Views/Administrativo/Ventas/VentasGenerar";
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

                <Route path="/trabajadores/*" element={<TrabajadoresRouters/>}/>
                <Route path="/tiendas/*" element={<TiendasRouters/>}/>
                <Route path="/productos/*" element={<ProductosRouters />}/>
                <Route path="/ventas/:tipo" element={<Ventas />}/>
                <Route path="/compras" element={<ComprasView/>}/>
                <Route path="/telas/*" element={<TelasRouters />}/>
                <Route path="/lotes/*" element={<LotesRouters />}/>
                <Route path="/gVenta/:tipo" element={<GenerarVentas/>} />
            </Route>
            <Route path="*" element={<ErrorView />} />
        </Routes>
    )
}
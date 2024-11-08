import { Route,Routes } from "react-router-dom";
import LoginView from "./Views/Login/LoginView";
import Ventas from "./Views/Ventas/Ventas"
import ErrorView from "./Views/Error/ErrorView"
import ComprasView from "./Views/Compras/ComprasView";
import TrabajadoresRouters from "./Routers/TrabajadoresRouters";
import TiendasRouters from "./Routers/TiendasRouters";
import ProductosRouters from "./Routers/ProductosRouters";
import TelasRouters from "./Routers/TelasRouters";
import LotesRouters from "./Routers/LotesRouters";
import Plantilla from "./Shared/Plantilla";
import GenerarVentas from "./Views/Ventas/VentasGenerar";

export const Routing = () =>{
    return(
        <Routes>
            {/* Login */}
            <Route path="/" element={<LoginView/>}/>
            <Route element={<Plantilla />}>
                {/* Administrativo */}
                <Route path="/trabajadores/*" element={<TrabajadoresRouters/>}/>
                <Route path="/tiendas/*" element={<TiendasRouters/>}/>
                <Route path="/productos/*" element={<ProductosRouters />}/>
                <Route path="/ventas/:tipo" element={<Ventas />}/>
                {/* Logístico */}
                <Route path="/compras" element={<ComprasView/>}/>
                {/* Producción */}
                <Route path="/telas/*" element={<TelasRouters />}/>
                <Route path="/lotes/*" element={<LotesRouters />}/>
                {/* VENTAS */}
                <Route path="/gVenta/:tipo" element={<GenerarVentas/>} />
            </Route>
            {/* Error */}
            <Route path="*" element={<ErrorView />} />
        </Routes>
    )
}
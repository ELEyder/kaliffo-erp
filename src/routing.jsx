import { Route,Routes } from "react-router-dom";
import LoginView from "./Views/Login/LoginView";
import TrabajadoresRouters from "./Routers/Administrativo/TrabajadoresRouters";
import TiendasRouters from "./Routers/Administrativo/TiendasRouters";
import ProductosRouters from "./Routers/Administrativo/ProductosRouters";
import Ventas from "./Views/Ventas/Ventas"
import ErrorView from "./Views/Error/ErrorView"
import ComprasView from "./Views/Compras/ComprasView";
import TelasRouters from "./Routers/TelasRouters";
import LotesRouters from "./Routers/LotesRouters";
import Plantilla from "./Shared/Plantilla";
import GenerarVentas from "./Views/Ventas/VentasGenerar";

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            <Route element={<Plantilla />}>
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
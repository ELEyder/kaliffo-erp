import { Route,Routes } from "react-router-dom";
import Trabajadores from "./Components/Trabajadores/Trabajadores";
import Ventas from "./Components/Ventas/Ventas"
import ErrorPagina from "./Components/Error/ErrorPagina"
import Compras from "./Components/Compras/Compras";
import TrabajadoresRouters from "./Routers/TrabajadoresRouters";
import TiendasRouters from "./Routers/TiendasRouters";
import ProductosRouters from "./Routers/ProductosRouters";
import TelasRouters from "./Routers/TelasRouters";
import LotesRouters from "./Routers/LotesRouters";

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores/>}/>
            {/* Administrativo */}
            <Route path="/trabajadores/*" element={<TrabajadoresRouters/>}/>
            <Route path="/tiendas/*" element={<TiendasRouters/>}/>
            <Route path="/productos/*" element={<ProductosRouters />}/>
            <Route path="/ventas/:tipo" element={<Ventas />}/>
            {/* Logístico */}
            <Route path="/compras" element={<Compras/>}/>
            {/* Producción */}
            <Route path="/telas/*" element={<TelasRouters />}/>
            <Route path="/lotes/*" element={<LotesRouters />}/>
            {/* Error */}
            <Route path="*" element={<ErrorPagina />} />
        </Routes>
    )
}
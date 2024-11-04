import { Route,Routes } from "react-router-dom";
import Trabajadores from "./Components/Trabajadores/Trabajadores";
import Trabajador from "./Components/Trabajador/Trabajador";
import Tiendas from "./Components/Tiendas/Tiendas";
import Tienda from "./Components/Tienda/Tienda";
import Productos from "./Components/Productos/Productos";
import Producto from "./Components/Producto/Producto";
import Ventas from "./Components/Ventas/Ventas"
import Telas from "./Components/Telas/Telas"
import Tela from "./Components/Tela/Tela"
import Lotes from "./Components/Lotes/Lotes"
import Lote from "./Components/Lote/Lote"
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
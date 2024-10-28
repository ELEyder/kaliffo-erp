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

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores/>}/>
            <Route path="/trabajador/:id" element={<Trabajador/>}/>
            <Route path="/tiendas" element={<Tiendas/>}/>
            <Route path="/tienda/:id" element={<Tienda />}/>
            <Route path="/productos/" element={<Productos />}/>
            <Route path="/producto/:id" element={<Producto />}/>
            <Route path="/ventas/:tipo" element={<Ventas />}/>
            <Route path="/compras" element={<Compras/>}/>
            <Route path="/ventas/:tipoVenta" element={<Ventas />}/>
            <Route path="/almacen/telas" element={<Telas />}/>
            <Route path="/almacen/tela/:tipo" element={<Tela />}/>
            <Route path="/lotes" element={<Lotes />}/>
            <Route path="/lote/:id" element={<Lote />}/>
            <Route path="*" element={<ErrorPagina />} />
        </Routes>
    )
}
import { Route,Routes } from "react-router-dom";
import Trabajadores from "./Components/Trabajadores/Trabajadores";
import Trabajador from "./Components/Trabajador/Trabajador";
import Tiendas from "./Components/Tiendas/Tiendas";
import Tienda from "./Components/Tienda/Tienda";
import Productos from "./Components/Productos/Productos";
import Producto from "./Components/Producto/Producto";
import Ventas from "./Components/Ventas/Ventas"
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
            <Route path="*" element={<ErrorPagina />} />
        </Routes>
    )
}
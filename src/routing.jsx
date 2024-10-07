import { Route,Routes } from "react-router-dom";
import Trabajadores from "./Components/Trabajadores/Trabajadores";
import Trabajador from "./Components/Trabajador/Trabajador";
import Tiendas_main from "./Components/Tiendas/Tiendas_Main";
import Tienda from "./Components/Tienda/Tienda";
import Productos from "./Components/Productos/Productos";
import Producto from "./Components/Producto/Producto";
import ErrorPagina from "./Components/Error/ErrorPagina"

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores/>}/>
            <Route path="/trabajador/:id" element={<Trabajador/>}/>
            <Route path="/tiendas" element={<Tiendas_main/>}/>
            <Route path="/tienda/:id" element={<Tienda />}/>
            <Route path="/productos/" element={<Productos />}/>
            <Route path="/producto/:id" element={<Producto />}/>
            <Route path="/error" element={<ErrorPagina />} />
        </Routes>
    )
}
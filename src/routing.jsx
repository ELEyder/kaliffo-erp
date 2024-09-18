import { Route,Routes } from "react-router-dom";
import Trabajadores_main from "./Components/Trabajadores/Trabajadores_main";
import Tiendas_main from "./Components/Tiendas/Tiendas_Main";
import Tienda_main from "./Components/Tienda/Tienda_main";
import Productos_main from "./Components/Productos/Productos_main";
import Producto_main from "./Components/Producto/Producto_main";
import ErrorPagina from "./Components/Error/ErrorPagina"
import Productos_main from "./Components/Productos/Productos_main"
import Producto_main from "./Components/Producto/Producto_main"
export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores_main/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores_main/>}/>
            <Route path="/tiendas" element={<Tiendas_main/>}/>
            <Route path="/tienda/:id" element={<Tienda_main />}/>
            <Route path="/productos/" element={<Productos_main />}/>
            <Route path="/producto/:id" element={<Producto_main />}/>
            <Route path="/error" element={<ErrorPagina />} />
            <Route path="/productos" element={<Productos_main />}/>
            <Route path="/producto/:id" element={<Producto_main />}/>
        </Routes>
    )
}
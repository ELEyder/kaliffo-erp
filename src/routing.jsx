import { Route,Routes } from "react-router-dom";
import Trabajadores from "./Components/Trabajadores/Trabajadores";
import Trabajador_main from "./Components/Trabajador/Trabajador_main";
import Tiendas_main from "./Components/Tiendas/Tiendas_Main";
import Tienda_main from "./Components/Tienda/Tienda_main";
import Productos_main from "./Components/Productos/Productos_main";
import Producto_main from "./Components/Producto/Producto_main";
import ErrorPagina from "./Components/Error/ErrorPagina"
import { notification } from 'antd'
export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores/>}/>
            <Route path="/trabajador/:id" element={<Trabajador_main/>}/>
            <Route path="/tiendas" element={<Tiendas_main/>}/>
            <Route path="/tienda/:id" element={<Tienda_main />}/>
            <Route path="/productos/" element={<Productos_main />}/>
            <Route path="/producto/:id" element={<Producto_main />}/>
            <Route path="/error" element={<ErrorPagina />} />
        </Routes>
    )
}
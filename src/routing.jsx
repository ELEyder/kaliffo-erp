import { Route,Routes } from "react-router-dom";
import Trabajadores_main from "./Components/Trabajadores/Trabajadores_main";
import Tiendas_main from "./Components/Tiendas/Tiendas_Main";
import Tienda_main from "./Components/Tienda/Tienda_main";

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores_main/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores_main/>}/>
            <Route path="/tiendas" element={<Tiendas_main/>}/>
            <Route path="/tienda/:id" element={<Tienda_main />}/>
        </Routes>
    )
}
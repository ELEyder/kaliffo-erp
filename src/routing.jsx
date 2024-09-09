import { Route,Routes } from "react-router-dom";
import Trabajadores_main from "./Components/Trabajadores/Trabajadores_main";

export const Routing = () =>{
    return(
        <Routes>
            <Route path="/" element={<Trabajadores_main/>}/>
            <Route path="/trabajadores/:tipo_trabajador" element={<Trabajadores_main/>}/>
        </Routes>
    )
}
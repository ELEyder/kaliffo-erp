import React from "react";
import Plantilla from "../../Shared/Plantilla";
import { Navigate } from "react-router-dom";

const ErrorPagina = () =>{
    return(
        <Plantilla>
            <h1>Error al cargar la ruta</h1>
        </Plantilla>
    )
}

export default ErrorPagina
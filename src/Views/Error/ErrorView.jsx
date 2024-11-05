import React from "react";
import { Link } from "react-router-dom";

const ErrorView = () =>{
    return(
        <>
        <link rel="stylesheet" href="css/error/error.css" />
        <div className="content">
            <img src="/public/img/bg/error-3.gif" alt="" />
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <Link to={"trabajadores/tipo/ventas"}>Ir a la página principal</Link>
        </div>
        </>
    )
}

export default ErrorView
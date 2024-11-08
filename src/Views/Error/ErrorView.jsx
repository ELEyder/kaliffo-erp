import React from "react";
import { Link } from "react-router-dom";
import "@/assets/css/error/error.css"
const ErrorView = () =>{
    return(
        <>
        <div className="body-error">
            <div className="content">
                <img class="img-error"src="/public/img/bg/error-3.gif" alt="" />
                <h1><span className="text">4</span>04</h1>
                <h2><span className="text">|</span> Página no encontrada</h2>
                <Link to={"trabajadores/tipo/ventas"}>Ir a la página principal</Link>
            </div>
        </div>
        </>
    )
}

export default ErrorView
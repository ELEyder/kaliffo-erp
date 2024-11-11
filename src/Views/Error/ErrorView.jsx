import React from "react";
import { Link } from "react-router-dom";
import styles from './ErrorView.module.css'
const ErrorView = () =>{
    return(
        <>
        <div className={ styles.body }>
            <div className={styles.content}>
                <img className={ styles.img } src="/public/img/bg/error-3.gif" alt="" />
                <h1 className={ styles.text }><span className={ styles.text }>4</span>04</h1>
                <h2 className={ styles.text }><span className={ styles.text }>|</span> Página no encontrada</h2>
                <Link to={"/trabajadores/tipo/ventas"}>Ir a la página principal</Link>
            </div>
        </div>
        </>
    )
}

export default ErrorView
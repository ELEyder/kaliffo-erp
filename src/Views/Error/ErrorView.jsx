import React from "react";
import { Link } from "react-router-dom"; // Importación para crear enlaces entre rutas
import styles from './ErrorView.module.css'; // Importación del archivo de estilos locales

const ErrorView = () => {
    return (
        <>
            {/* Contenedor principal con la clase de estilo 'body' */}
            <div className={styles.body}>
                {/* Contenedor del contenido de error */}
                <div className={styles.content}>
                    {/* Imagen que muestra una animación de error */}
                    <img className={styles.img} src="/img/bg/error-3.gif" alt="Error animado" />
                    
                    {/* Texto grande del código de error 404 */}
                    <h1 className={styles.text}>
                        <span className={styles.text}>4</span>04
                    </h1>
                    
                    {/* Subtítulo indicando que la página no fue encontrada */}
                    <h2 className={styles.text}>
                        <span className={styles.text}>|</span> Página no encontrada
                    </h2>

                    {/* Enlace para redirigir al usuario a la página principal */}
                    <Link to={"/trabajadores/tipo/ventas"}>Ir a la página principal</Link>
                </div>
            </div>
        </>
    );
}

export default ErrorView;

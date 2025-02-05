import React from "react";
import { useSession } from "../../../context/AuthProvider"; // Hook para acceder al estado de sesión
import MovimientoAlmacenTienda from "@CL/MovimientoMercaderia/MovimientoAlmacenTienda";
import MovimientoTiendaTienda from "@CL/MovimientoMercaderia/MovimientoTiendaTienda";

const MovimientoMercaderiaGenerar = () => {

  const { user, login, logout } = useSession(); // Extraemos los datos del usuario y funciones de login/logout desde el contexto


  return (
    <>
        {user.rol==="administrador"?(
            <MovimientoAlmacenTienda />
        ):(
            <MovimientoTiendaTienda />
        )}
    </>
  );
};

export default MovimientoMercaderiaGenerar;

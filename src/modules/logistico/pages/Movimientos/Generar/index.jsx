import React from "react";
import { useSession } from "../../../../../context/AuthProvider"; // Hook para acceder al estado de sesión
import MovimientoAlmacenTiendaCard from "../../../components/Cards/MovimientoAlmacenTienda"; 
import MovimientoTiendaTiendaCard from "../../../components/Cards/MovimientoTiendaTienda";

const MovimientoMercaderiaGenerar = () => {

  const { user } = useSession(); // Extraemos los datos del usuario y funciones de login/logout desde el contexto


  return (
    <>
        {user.rol==="administrador"?(
            <MovimientoAlmacenTiendaCard />
        ):(
            <MovimientoTiendaTiendaCard />
        )}
    </>
  );
};

export default MovimientoMercaderiaGenerar;

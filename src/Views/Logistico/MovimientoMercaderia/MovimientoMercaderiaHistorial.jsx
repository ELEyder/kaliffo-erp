import { Divider } from "antd";
import React from "react";
import MovimientosTiposCards from "@CL/MovimientoMercaderia/MovimientosTiposCards";
 
const MovimientoMercaderiaHistorial = () => {
  return (
    <>
        <Divider>
            MOVIMIENTOS
        </Divider>

        <MovimientosTiposCards />
    </>
  );
};

export default MovimientoMercaderiaHistorial;

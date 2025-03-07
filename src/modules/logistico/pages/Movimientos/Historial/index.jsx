import { Divider } from "antd";
import React from "react";
import MovimientosTiposCards from "../../../components/Cards/MovimientosTiposCards";
 
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

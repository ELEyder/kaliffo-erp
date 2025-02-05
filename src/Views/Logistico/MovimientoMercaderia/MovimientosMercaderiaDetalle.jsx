import { Divider } from "antd";
import { useParams } from "react-router-dom";
import * as MovimientosMercaderia from "../../../interfaces/MovimientosMercaderia";
import { useState } from "react";
import Tabla from "../../../Components/Tabla";

const MovimientosMercaderiaDetalle = () => {
  const { tipo } = useParams();
  const [idM, setidM] = useState(1);
  const [modals, setModals] = useState({
    movD: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnasMovimiento = MovimientosMercaderia.getColumnas(changeModal,setidM,tipo)

  return (
    <>
      <Divider>DETALLE DE LOS ENVIOS</Divider>
      <Tabla 
        columnas={columnasMovimiento}
        rowKey={"movimiento_id"}
        url={MovimientosMercaderia.getURL(tipo)}
      />
    </>
  );
};

export default MovimientosMercaderiaDetalle;

import React, { useState } from "react";
import Plantilla from "../../Shared/Plantilla";
import Tiendas_cards from "./TiendasCards/Tiendas_cards";
import { Divider, FloatButton } from "antd";
import Modal_añadir from "./TiendasModal/Modal_Añadir";

const Tiendas_main = () => {
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [refrescar, setRefrescar] = useState(false);

  const refrescarCards = () => {
    setRefrescar(true);
    setTimeout(() => setRefrescar(false), 500);
  };

  const toggleModalAñadir = () => setModalAñadirAbierto((prev) => !prev);

  const handleAñadirExitoso = () => {
    toggleModalAñadir();
    refrescarCards();
  };

  return (
    <Plantilla>
      <Divider>TIENDAS</Divider>
      <FloatButton tooltip="Añadir" onClick={toggleModalAñadir} />
      <Tiendas_cards refrescar={refrescar} />
      <Modal_añadir 
        ModalAñadirAbierto={modalAñadirAbierto}
        closeModalAñadir={toggleModalAñadir} 
        añadidoexitoso={handleAñadirExitoso} 
      />
    </Plantilla>
  );
};

export default Tiendas_main;

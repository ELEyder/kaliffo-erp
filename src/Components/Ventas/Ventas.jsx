import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import AddUsuarioModal from "./Modals/AddUsuarioModal"
import VentasTable from "./Tablas/VentasTable";
import { Divider, FloatButton } from "antd";

const Ventas = () => {
  
  const { tipo } = useParams();
  const [openAddUsuario, setOpenAddUsuario] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <Plantilla>
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>

      <VentasTable reload={() => setReload(!reload)} />

      <FloatButton tooltip="Añadir Nuevo" onClick={() => setOpenAddUsuario(true)} />

      <AddUsuarioModal
        openModal={openAddUsuario}
        closeModal={setOpenAddUsuario}
        tipoTrabajador={tipo}
        reload={reload}
        setReload={setReload}
      />

    </Plantilla>
  );
};

export default Ventas;

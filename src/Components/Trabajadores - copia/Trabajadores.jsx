import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import AddUsuarioModal from "./Modals/AddUsuarioModal"
import TrabajadoresTable from "./Tablas/TrabajadoresTable";
import { Divider, FloatButton } from "antd";

const Trabajadores = () => {
  const { tipo_trabajador } = useParams();
  const [openAddUsuario, setOpenAddUsuario] = useState(false);
  const [reload, setReload] = useState(false);

  const tiposValidos = ["ventas", "talleres", "miscelaneos", "costureros"];
  if (tipo_trabajador && !tiposValidos.includes(tipo_trabajador)) {
    return <Navigate to="/error" />;
  }

  return (
    <Plantilla>
      <Divider style={{textTransform: "uppercase"}}>
        {tipo_trabajador}
      </Divider>

      <TrabajadoresTable
        reload={() => setReload(!reload)}
      />

      <FloatButton tooltip="Añadir Nuevo" onClick={() => setOpenAddUsuario(true)} />

      <AddUsuarioModal
        openModal={openAddUsuario}
        closeModal={setOpenAddUsuario}
        tipoTrabajador={tipo_trabajador}
        reload={reload}
        setReload={setReload}
      />

    </Plantilla>
  );
};

export default Trabajadores;

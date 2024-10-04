import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import AddUsuarioModal from "./Modals/AddUsuarioModal"
import TrabajadoresTable from "./Tablas/TrabajadoresTable";
import { deleteUsuario } from "../../Shared/api/Usuario";
import { Divider, FloatButton } from "antd";

const Trabajadores = () => {
  const { tipo_trabajador } = useParams();
  const [openAddUsuario, setOpenAddUsuario] = useState(false);

  const [reload, setReload] = useState(false);

  const tiposValidos = ["ventas", "talleres", "miscelaneos", "costureros"];
  if (tipo_trabajador && !tiposValidos.includes(tipo_trabajador)) {
    return <Navigate to="/error" />;
  }

  const refrescarTabla = () => {
    setReload(true);
    setTimeout(() => setReload(false), 500);
  };

  const eliminar = async (id) => {
    const eliminado = await deleteUsuario(id);
    if (eliminado) {
      refrescarTabla();
    }
  };

  return (
    <Plantilla>
      <Divider style={{textTransform: "uppercase"}}>
        {tipo_trabajador}
      </Divider>

      <TrabajadoresTable
        tipo_trabajador={tipo_trabajador}
        reload={reload}
        setReload={setReload}
        eliminar={eliminar}
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

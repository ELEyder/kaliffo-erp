import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import TrabajadoresTable from "./Tablas/TrabajadoresTable";
import { Divider } from "antd";

const Trabajadores = () => {
  const { tipo_trabajador } = useParams();

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




    </Plantilla>
  );
};

export default Trabajadores;

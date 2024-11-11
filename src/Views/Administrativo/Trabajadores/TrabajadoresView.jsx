import React from "react";
import { useParams, Navigate } from "react-router-dom";
import TrabajadoresTable from "@C/Tables/TrabajadoresTable";
import { Divider } from "antd";

const Trabajadores = () => {
  const { tipo_trabajador } = useParams();

  const tiposValidos = ["ventas", "talleres", "miscelaneos", "costureros"];

  if (tipo_trabajador && !tiposValidos.includes(tipo_trabajador)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}>{tipo_trabajador}</Divider>
      <TrabajadoresTable/>
    </>
  );
};

export default Trabajadores;

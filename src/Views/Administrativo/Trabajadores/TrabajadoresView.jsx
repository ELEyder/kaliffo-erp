import React from "react";
import { useParams, Navigate } from "react-router-dom";
import TrabajadoresTable from "@C/Tables/TrabajadoresTable";
import { Divider } from "antd";

const Trabajadores = () => {
  const { tipo } = useParams();

  const tiposValidos = ["ventas", "talleres", "miscelaneos", "costureros"];

  if (!tiposValidos.includes(tipo)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}>{tipo}</Divider>
      <TrabajadoresTable tipo={tipo}/>
    </>
  );
};

export default Trabajadores;

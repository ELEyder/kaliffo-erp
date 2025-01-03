import React from "react";
import { useParams, Navigate } from "react-router-dom";
import TrabajadoresTable from "@CA/trabajadores/TrabajadoresTable";
import { Divider } from "antd";

const Trabajadores = () => {
  // Obtiene el tipo desde los parámetros de la URL
  const { tipo } = useParams();

  // Lista de tipos válidos para verificar
  const tiposValidos = ["ventas", "talleres", "miscelaneos", "costureros"];

  // Redirige a una página de error si el tipo no es válido
  if (!tiposValidos.includes(tipo)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      {/* Divisor estilizado que muestra el tipo */}
      <Divider style={{ textTransform: "uppercase" }}>{tipo}</Divider>
      {/* Tabla que muestra los trabajadores según el tipo */}
      <TrabajadoresTable tipo={tipo} />
    </>
  );
};

export default Trabajadores;

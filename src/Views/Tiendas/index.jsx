import React from "react";
import TiendasCards from "@CA/tiendas/TiendasCards";
import { Divider } from "antd";

const TiendasView = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado para "TIENDAS" */}
      <Divider style={{ textTransform: "uppercase" }}>TIENDAS</Divider>
      {/* Componente que muestra las tarjetas de tiendas */}
      <TiendasCards />
      <Divider></Divider>
    </>
  );
};

export default TiendasView;

import React from "react";
import LotesCards from "../../../../components/produccion/lotes/LotesCards";
import { Divider } from "antd";

const LotesView = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}> Lotes </Divider>
      {/* Componente que muestra las tarjetas de lotes */}
      <LotesCards />
    </>
  );
};

export default LotesView;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import VentasTable from "./Tablas/VentasTable";
import { Divider } from "antd";

const Ventas = () => {
  
  const { tipo } = useParams();

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>
      <VentasTable/>
    </>
  );
};

export default Ventas;

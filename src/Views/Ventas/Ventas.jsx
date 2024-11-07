import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VentasTipoTable from "../../Components/Tables/VentasTipoTable";
import { Divider } from "antd";

const Ventas = () => {
  
  const { tipo } = useParams();

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>
      <VentasTipoTable/>
    </>
  );
};

export default Ventas;

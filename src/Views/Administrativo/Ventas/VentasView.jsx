import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VentasTipoTable from "@C/Tables/VentasTipoTable";
import { Divider } from "antd";

const VentasView = () => {
  
  const { tipo } = useParams();

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>
      <VentasTipoTable/>
    </>
  );
};

export default VentasView;

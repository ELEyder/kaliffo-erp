import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import { Divider, FloatButton } from "antd";
import TablaCompras from "./Tablas/TablaCompras";
import AddCompraModal from "./Modals/AddCompraModal";

const Compras = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>
        COMPRAS
      </Divider>
      <TablaCompras reload={()=>setReload(!reload)}/>
    </>
  );
};

export default Compras;

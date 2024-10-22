import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import { Divider, FloatButton } from "antd";
import TablaCompras from "./Tablas/TablaCompras";
import AddCompraModal from "./Modals/AddCompraModal";

const Compras = () => {

    const [openAddCompra,setopenAddCompra] = useState(false)
    const [reload, setReload] = useState(false);

  return (
    <Plantilla>
      <Divider style={{ textTransform: "uppercase" }}>
        COMPRAS
      </Divider>
      
      <TablaCompras reload={reload}/>

      <FloatButton tooltip="Añadir Nuevo" onClick={()=>setopenAddCompra(true)} /> 

      <AddCompraModal 
        openModal={openAddCompra}
        closeModal={setopenAddCompra}
        reload={reload}
        setReload={setReload}
      />

    </Plantilla>
  );
};

export default Compras;

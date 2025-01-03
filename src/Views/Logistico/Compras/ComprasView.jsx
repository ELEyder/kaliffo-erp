import React from "react";
import { Divider } from "antd";
import TablaCompras from "@CL/compras/TablaCompras";

const ComprasView = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        COMPRAS
      </Divider>
      {/* Componente de tabla de compras con funcionalidad de recarga */}
      <TablaCompras reload={() => setReload(!reload)} />
    </>
  );
};

export default ComprasView;

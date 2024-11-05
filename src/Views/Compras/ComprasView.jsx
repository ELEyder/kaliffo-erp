import React from "react";
import { Divider } from "antd";
import TablaCompras from "../../Components/Tables/TablaCompras";

const ComprasView = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>
        COMPRAS
      </Divider>
      <TablaCompras reload={()=>setReload(!reload)}/>
    </>
  );
};

export default ComprasView;

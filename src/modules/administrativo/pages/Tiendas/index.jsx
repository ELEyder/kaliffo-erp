import React from "react";
import { Divider } from "antd";
import TiendasTable from "../../components/Tables/TiendasTable";

const TiendasView = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>Tiendas</Divider>
      <TiendasTable />
      <Divider></Divider>
    </>
  );
};

export default TiendasView;

import React from "react";
import { Divider } from "antd";
import AlmacenesTable from "../../components/Tables/AlmacenesTable";

const AlmacenProductos = () => {
  return (
    <>
      <Divider>ALMACENES DE PRODUCTOS</Divider>
      <AlmacenesTable />
    </>
  );
};

export default AlmacenProductos;

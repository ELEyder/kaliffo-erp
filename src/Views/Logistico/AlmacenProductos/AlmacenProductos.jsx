import React from "react";
import { Divider } from "antd";
import AlmacenProductosCards from "@CL/AlmacenProductos/AlmacenProductosCards";

const AlmacenProductos = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>
        Almacen Productos
      </Divider>
      <AlmacenProductosCards/>
    </>
  );
};

export default AlmacenProductos;

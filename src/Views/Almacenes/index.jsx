import React from "react";
import { Divider } from "antd";
import AlmacenProductosCards from "@CL/AlmacenProductos/AlmacenProductosCards";

const AlmacenProductos = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Almacen Productos
      </Divider>
      {/* Componente que muestra las tarjetas de productos en el almacén */}
      <AlmacenProductosCards />
    </>
  );
};

export default AlmacenProductos;

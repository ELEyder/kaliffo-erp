import React from "react";
import ProductosCards from "@CA/productos/ProductosCards";
import { Divider } from "antd";

const ProductosView = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Productos
      </Divider>
      {/* Componente que muestra las tarjetas de productos */}
      <ProductosCards />
    </>
  );
};

export default ProductosView;

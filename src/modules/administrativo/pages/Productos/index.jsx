import React from "react";
import ProductosCards from "@CA/productos/ProductosCards";
import { Divider } from "antd";
import ProductosTable from "../../components/Tables/ProductosTable";

const ProductosView = () => {
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Productos
      </Divider>
      {/* Componente que muestra las tarjetas de productos */}
      <ProductosTable />
    </>
  );
};

export default ProductosView;

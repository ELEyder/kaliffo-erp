import React from "react";
import ProductoInfoCard from "@C/administrativo/productos/ProductoInfoCard";
import ProductoTiendasTable from "@CA/productos/ProductoTiendasTable";
import ProductoTallasTable from "@CA/productos/ProductoTallasTable";
import ProductoColoresTable from "@CA/productos/ProductoColoresTable";


import { Flex, Divider , Tabs } from "antd";

const ProductoView = () => {
  // Definición de las pestañas con sus respectivos componentes
  const items = [
    { key: '1', label: 'Tiendas', children: <ProductoTiendasTable /> },
    { key: '2', label: 'Tallas', children: <ProductoTallasTable /> },
    { key: '3', label: 'Colores', children: <ProductoColoresTable /> },
  ];

  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Detalles del Producto
      </Divider>

      {/* Diseño de dos columnas: una para la información del producto y otra para las pestañas */}
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px", // Máxima anchura del contenedor
          margin: "0 auto", // Centrado horizontal
          padding: "1rem", // Espaciado interno
        }}
      >
          {/* Componente con la información del producto */}
          <ProductoInfoCard />
          <Tabs defaultActiveKey="1" items={items} />
      </Flex>

      {/* Divisor adicional para separar contenido */}
      <Divider />
    </>
  );
};

export default ProductoView;

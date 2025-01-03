import React from "react";
import ProductoInfoCard from "@C/administrativo/productos/ProductoInfoCard";
import ProductoTiendasTable from "@CA/productos/ProductoTiendasTable";
import ProductoTallasTable from "@CA/productos/ProductoTallasTable";
import ProductoColoresTable from "@CA/productos/ProductoColoresTable";
import { Col, Divider, Row, Tabs } from "antd";

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
      <Row gutter={24}>
        <Col span={10}>
          {/* Componente con la información del producto */}
          <ProductoInfoCard />
        </Col>
        <Col span={12}>
          {/* Pestañas para mostrar detalles adicionales */}
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>

      {/* Divisor adicional para separar contenido */}
      <Divider />
    </>
  );
};

export default ProductoView;

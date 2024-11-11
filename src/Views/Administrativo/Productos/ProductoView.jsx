import React from "react";
import ProductoInfoCard from "@C/Cards/ProductoInfoCard"
import ProductoTiendasTable from "@C/Tables/ProductoTiendasTable"
import ProductoTallasTable from "@C/Tables/ProductoTallasTable"
import ProductoColoresTable from "@C/Tables/ProductoColoresTable"
import { Col, Divider, Row, Tabs } from "antd";

const ProductoView = () => {
    
  const items = [
    {
      key: '1',
      label: 'Tiendas',
      children: <ProductoTiendasTable/>,
    },
    {
      key: '2',
      label: 'Tallas',
      children: <ProductoTallasTable />,
    },
    {
      key: '3',
      label: 'Colores',
      children: <ProductoColoresTable />,
    },
  ];

    return (
      <>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles del Producto
        </Divider>
        <Row  gutter={24}>
            <Col span={10}>
              <ProductoInfoCard/>
            </Col>
            <Col span={12}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </>
    );
  };

export default ProductoView
import React from "react";
import Plantilla from "../../Shared/Plantilla"
import ProductoInfoCard from "./Cards/ProductoInfoCard"
import BestColoresCard from "./Cards/BestColoresCard"
import ProductoTiendasTable from "./Tablas/ProductoTiendasTable"
import ProductoTallasTable from "./Tablas/ProductoTallasTable"
import ProductoColoresTable from "./Tablas/ProductoColoresTable"
import { Col, Divider, Row, Tabs } from "antd";

const Producto = () => {
    
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
      <Plantilla>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles del Producto
        </Divider>
        <Row  gutter={24}>
            <Col span={10}>
              <ProductoInfoCard/>
              <Divider></Divider>
              <BestColoresCard/>
            </Col>
            <Col span={12}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </Plantilla>
    );
  };

export default Producto
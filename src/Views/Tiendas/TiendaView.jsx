import React from "react";
import TiendaCard from "@C/Cards/TiendaCard"
import ProductosTable from "@C/Tables/ProductosTable"
import PersonalTable from "@C/Tables/PersonalTable"
import VentasTable from "@C/Tables/VentasTable"
import { Col, Divider, Row, Tabs } from "antd";

const TiendaView = () => {

  const items = [
    { key: '1', label: 'Productos', children: <ProductosTable/>},
    { key: '2', label: 'Personal', children: <PersonalTable/>},
    { key: '3', label: 'Ventas', children: <VentasTable/>},
  ];

  return (
    <>
      <Divider/>
      <Row gutter={24}>
        <Col span={6}>
          <TiendaCard/>
        </Col>
        <Col span={18}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
      <Divider/>
    </>
  );
};

export default TiendaView;

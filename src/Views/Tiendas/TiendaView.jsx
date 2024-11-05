import React from "react";
import TiendaCard from "../../Components/Cards/TiendaCard"
import ProductosTable from "../../Components/Tables/ProductosTable"
import PersonalTable from "../../Components/Tables/PersonalTable"
import VentasTable from "../../Components/Tables/VentasTable"
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
        <Col span={8}>
          <TiendaCard/>
        </Col>
        <Col span={16}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
      <Divider/>
    </>
  );
};

export default TiendaView;

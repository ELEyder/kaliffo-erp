import React from "react";
import Plantilla from "../../Shared/Plantilla";
import InfoTiendaCard from "./Cards/InfoTiendaCard";
import BestProductosCard from "./Cards/BestProductosCard";
import ProductosTable from "./Tablas/ProductosTable";
import PersonalTable from "./Tablas/PersonalTable"
import { Col, Divider, Row, Tabs } from "antd";

const Tienda = () => {

  const items = [
    {
      key: '1',
      label: 'Productos',
      children: <ProductosTable/>,
    },
    {
      key: '2',
      label: 'Personal',
      children: <PersonalTable/>,
    },
    {
      key: '3',
      label: 'Pagos',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <Plantilla>
      <Divider/>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={8}>
          <InfoTiendaCard/>
          <Divider/>
          <BestProductosCard/>
        </Col>
        <Col className="gutter-row" span={16}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
      <Divider/>
    </Plantilla>
  );
};

export default Tienda;

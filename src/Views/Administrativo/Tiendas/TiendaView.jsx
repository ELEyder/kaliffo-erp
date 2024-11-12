import React from "react";
import TiendaCard from "@C/Cards/TiendaCard"
import ProductosTable from "@C/Tables/ProductosTable"
import PersonalTable from "@C/Tables/PersonalTable"
import VentasTable from "@C/Tables/VentasTable"
import { Col, Divider, Flex, Row, Tabs } from "antd";

const TiendaView = () => {

  const items = [
    { key: '1', label: 'Productos', children: <ProductosTable/>},
    { key: '2', label: 'Personal', children: <PersonalTable/>},
    { key: '3', label: 'Ventas', children: <VentasTable/>},
  ];

  return (
    <>
      <Divider/>
      <Flex wrap gap="small" vertical={false} justify={'space-evenly'} align="flex-start">
        <TiendaCard/>
        <Tabs defaultActiveKey="1" items={items} style={{ minWidth: '500px' }}/>
      </Flex>
    </>
  );
};

export default TiendaView;

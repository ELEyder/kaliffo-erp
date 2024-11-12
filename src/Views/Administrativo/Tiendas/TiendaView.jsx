import React from "react";
import TiendaCard from "@CA/tiendas/TiendaCard"
import ProductosTable from "@CA/tiendas/ProductosTable"
import PersonalTable from "@CA/tiendas/PersonalTable"
import VentasTable from "@CA/tiendas/VentasTable"
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

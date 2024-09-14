import { Tabs } from "antd";
import React from "react";
import TiendaProductos from "./TiendaProductos";
import TiendaPersonal from "./TiendaPersonal"

const items = [
    {
      key: '1',
      label: 'Productos',
      children: <TiendaProductos/>,
    },
    {
      key: '2',
      label: 'Personal',
      children: <TiendaPersonal />,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

const TiendaContenidoMain = () =>{
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default TiendaContenidoMain
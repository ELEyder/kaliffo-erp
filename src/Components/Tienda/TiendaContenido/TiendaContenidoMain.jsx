import { Tabs } from "antd";
import React from "react";
import TiendaProductos from "./TiendaProductos";
import TiendaPersonal from "./TiendaPersonal"


const TiendaContenidoMain = ({id,handlerefrescarSideCard1}) =>{

  const items = [
    {
      key: '1',
      label: 'Productos',
      children: <TiendaProductos id={id} handlerefrescarSideCard1={handlerefrescarSideCard1}/>,
    },
    {
      key: '2',
      label: 'Personal',
      children: <TiendaPersonal id={id} handlerefrescarSideCard1={handlerefrescarSideCard1}/>,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];


    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default TiendaContenidoMain
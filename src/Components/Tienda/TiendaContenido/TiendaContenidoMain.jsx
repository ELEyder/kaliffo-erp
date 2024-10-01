import { Tabs } from "antd";
import React from "react";
import TablaProductos from "./Tablas/TablaProductos";
import TablaPersonal from "./Tablas/TablaPersonal"


const TiendaContenidoMain = ({id,handlerefrescarSideCard1}) =>{

  const items = [
    {
      key: '1',
      label: 'Productos',
      children: <TablaProductos id={id} handlerefrescarSideCard1={handlerefrescarSideCard1}/>,
    },
    {
      key: '2',
      label: 'Personal',
      children: <TablaPersonal id={id} handlerefrescarSideCard1={handlerefrescarSideCard1}/>,
    },
    {
      key: '3',
      label: 'Pagos',
      children: 'Content of Tab Pane 3',
    },
  ];


    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default TiendaContenidoMain
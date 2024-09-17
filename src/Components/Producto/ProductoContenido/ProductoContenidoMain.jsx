import { Tabs } from "antd";
import React from "react";
import ProductoProductos from "./ProductoProductos";
import ProductoPersonal from "./ProductoPersonal"

const items = [
    {
      key: '1',
      label: 'Productos',
      children: <ProductoProductos/>,
    },
    {
      key: '2',
      label: 'Personal',
      children: <ProductoPersonal />,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

const ProductoContenidoMain = () =>{
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default ProductoContenidoMain
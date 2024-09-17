import { Tabs } from "antd";
import React from "react";
import ProductoProductos from "./ProductoProductos";
import ProductoPersonal from "./ProductoPersonal"

const items = [
    {
      key: '1',
      label: 'Tallas',
      children: <ProductoProductos/>,
    },
    {
      key: '2',
      label: 'Colores',
      children: <ProductoPersonal />,
    },
  ];

const ProductoContenidoMain = () =>{
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default ProductoContenidoMain
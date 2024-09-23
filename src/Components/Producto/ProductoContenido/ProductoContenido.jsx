import { Tabs } from "antd";
import React from "react";
import ProductoTiendas from "./Tablas/ProductoTiendas";
import ProductoTallas from "./Tablas/ProductoTallas"
import ProductoColores from "./Tablas/ProductoColores"

const items = [
    {
      key: '1',
      label: 'Tiendas',
      children: <ProductoTiendas/>,
    },
    {
      key: '2',
      label: 'Tallas',
      children: <ProductoTallas />,
    },
    {
      key: '3',
      label: 'Colores',
      children: <ProductoColores />,
    },
  ];

const ProductoContenidoMain = () =>{
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default ProductoContenidoMain
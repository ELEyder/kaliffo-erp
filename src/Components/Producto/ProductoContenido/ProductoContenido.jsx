import { Tabs } from "antd";
import React from "react";
import ProductoTiendas from "./Tablas/ProductoTiendas";
import ProductoTallas from "./Tablas/ProductoTallas"
import ProductoColores from "./Tablas/ProductoColores"
import { useParams } from 'react-router-dom'



const ProductoContenidoMain = () =>{
    const { id } = useParams();
    
    const items = [
      {
        key: '1',
        label: 'Tiendas',
        children: <ProductoTiendas id={ id }/>,
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
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default ProductoContenidoMain
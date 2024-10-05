import React from "react";
import { useParams } from 'react-router-dom'
import Plantilla from "../../Shared/Plantilla"
import ProductoInfoCard from "./Cards/ProductoInfoCard"
import BestColoresCard from "./Cards/BestColoresCard"
import ProductoTiendasTable from "./Tablas/ProductoTiendasTable"
import ProductoTallasTable from "./Tablas/ProductoTallasTable"
import ProductoColoresTable from "./Tablas/ProductoColoresTable"
import { Col, Divider, Row, Tabs } from "antd";

const Producto_main = () => {
  const { id } = useParams();
    
  const items = [
    {
      key: '1',
      label: 'Tiendas',
      children: <ProductoTiendasTable id={ id }/>,
    },
    {
      key: '2',
      label: 'Tallas',
      children: <ProductoTallasTable />,
    },
    {
      key: '3',
      label: 'Colores',
      children: <ProductoColoresTable />,
    },
  ];

    return (
      <Plantilla>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles del Producto
        </Divider>
        <Row  gutter={24}>
            <Col span={8}>
              <ProductoInfoCard/>
              <Divider></Divider>
              <BestColoresCard/>
            </Col>
            <Col span={16}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </Plantilla>
    );
  };

export default Producto_main
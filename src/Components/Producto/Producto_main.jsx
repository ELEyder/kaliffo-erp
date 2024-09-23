import React from "react";
import Plantilla from "../../Shared/Plantilla"
import { useParams } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import ProductoSidebar from "./ProductoSidebar/ProductoSidebar";
import ProductoContenido from "./ProductoContenido/ProductoContenido";

const Producto_main = () => {
  
    return (
      <Plantilla>
        <Divider>Producto</Divider>
        <Row  gutter={24}>
            <Col span={8}>
              <ProductoSidebar/>
            </Col>
            <Col span={16}>
                <ProductoContenido/>
            </Col>
        </Row>
      </Plantilla>
    );
  };

export default Producto_main
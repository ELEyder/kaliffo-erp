import React from "react";
import Plantilla from "../../Shared/Plantilla"
import { useParams } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import ProductoSidebar from "./ProductoSidebar/ProductoSidebar";
import ProductoContenidoMain from "./ProductoContenido/ProductoContenidoMain";

const Producto_main = () => {
  
    return (
      <Plantilla>
        <Divider>Producto</Divider>
        <Row  gutter={24}>
            <Col span={8}>
              <ProductoSidebar/>
            </Col>
            <Col span={16}>
                <ProductoContenidoMain/>
            </Col>
        </Row>
      </Plantilla>
    );
  };

export default Producto_main
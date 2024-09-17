import React from "react";
import Plantilla from "../../Shared/Plantilla"
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import ProductoSidebar from "./ProductoSidebar/ProductoSidebar";
import ProductoContenidoMain from "./ProductoContenido/ProductoContenidoMain";

const Producto_main = () => {
    const { id } = useParams();
  
    return (
      <Plantilla>
        <Row>
            <Col span={7}
            style={{padding: "auto", gap: "24px"}}>
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
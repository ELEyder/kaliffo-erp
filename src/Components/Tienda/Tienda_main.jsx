import React from "react";
import Plantilla from "../../Shared/Plantilla"
import { useParams } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import TiendaSidebar from "./TiendaSidebar/TiendaSidebar";
import TiendaContenidoMain from "./TiendaContenido/TiendaContenidoMain";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const Tienda_main = () => {
    const { id } = useParams();
  
    return (
      <Plantilla>
        <Row>
            <Col span={8}>
                <TiendaSidebar/>
            </Col>
            <Col span={16}>
                <TiendaContenidoMain/>
            </Col>
        </Row>
      </Plantilla>
    );
  };

export default Tienda_main
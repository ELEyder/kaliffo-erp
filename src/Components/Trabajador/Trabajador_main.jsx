import React from "react";
import Plantilla from "../../Shared/Plantilla"
import { Col, Divider, Row } from "antd";
import TrabajadorSidebar from "./TrabajadorSidebar/TrabajadorSidebar";
import TrabajadorContenido from "./TrabajadorContenido/TrabajadorContenido";

const Trabajador_main = () => {
  
    return (
      <Plantilla>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles del Usuario
        </Divider>
        <Row  gutter={24}>
            <Col span={8}>
              <TrabajadorSidebar/>
            </Col>
            <Col span={16}>
                <TrabajadorContenido/>
            </Col>
        </Row>
        <Divider></Divider>
      </Plantilla>
    );
  };

export default Trabajador_main
import React, { useEffect, useState } from "react";
import Plantilla from "../../Shared/Plantilla";
import { useParams } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import TiendaSidebar from "./TiendaSidebar/TiendaSidebar";
import TiendaContenidoMain from "./TiendaContenido/TiendaContenidoMain";

const Tienda_main = () => {
  const { id } = useParams();
  const [refrescarSideCard1, setrefrescarSideCard1] = useState(false);

  const handlerefrescarSideCard1 = () => {
    setrefrescarSideCard1(true);
    setTimeout(() => setrefrescarSideCard1(false), 500);
  };

  return (
    <Plantilla>
      <Divider></Divider>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={8}>
          <TiendaSidebar id={id} refrescarSideCard1={refrescarSideCard1}/>
        </Col>
        <Col className="gutter-row" span={16}>
          <TiendaContenidoMain id={id} handlerefrescarSideCard1={handlerefrescarSideCard1}/>
        </Col>
      </Row>
      <Divider></Divider>
    </Plantilla>
  );
};

export default Tienda_main;

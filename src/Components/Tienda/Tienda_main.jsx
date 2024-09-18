import React, { useEffect, useState } from "react";
import Plantilla from "../../Shared/Plantilla";
import { useParams } from "react-router-dom";
import { Col, Divider, Layout, Row } from "antd";
import TiendaSidebar from "./TiendaSidebar/TiendaSidebar";
import TiendaContenidoMain from "./TiendaContenido/TiendaContenidoMain";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { getTienda } from "../../Shared/Funciones/Fucniones_Tienda";

const Tienda_main = () => {
  const { id } = useParams();
  const [tienda,setTienda] = useState([])
  
  useEffect(()=>{
    getTienda(id,setTienda)
  },[id])

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
        <Col  className="gutter-row" span={8}>
          <TiendaSidebar tienda={tienda} />
        </Col>
        <Col  className="gutter-row" span={16}>
          <TiendaContenidoMain id={id}/>
        </Col>
      </Row>
      <Divider></Divider>
    </Plantilla>
  );
};

export default Tienda_main;

import React, { useEffect, useState } from "react";
import { CargarTiendas } from "../../../Shared/Funciones/Funciones_Tiendas";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const {Meta} = Card


const Tiendas_cards = ({ refrescar }) => {
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    CargarTiendas(setTiendas);
  }, [refrescar]);

  return (
    <Row gutter={16}>
      {tiendas.map((tienda, index) => (
        <Col key={index} span={8}>
          <Card title={tienda.tienda}
          actions={[
            <>
              <Link to={`/tienda/${tienda.tienda_id}`}>VER MAS</Link>
            </>
          ]}>
            <Meta
            title={`${tienda.telefono}`}
            description={`${tienda.direccion}`}/>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Tiendas_cards;

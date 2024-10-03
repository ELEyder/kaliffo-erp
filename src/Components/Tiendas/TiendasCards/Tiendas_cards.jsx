import React, { useEffect, useState } from "react";
import { getTiendas } from "../../../Shared/api/Tienda";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const {Meta} = Card


const Tiendas_cards = ({ refrescar }) => {
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    getTiendas(setTiendas);
  }, [refrescar]);

  return (
    <Row gutter={16}>
      {tiendas.map((tienda, index) => (
        <Col key={index} span={8}>
          <Card style={{textAlign:"center"}} title={
            <div style={{marginTop:"10px"}}>
              <h3 style={{fontSize:"20px",fontWeight:"bold"}}>{tienda.tienda}</h3>
            </div>
          }
          actions={[
            <>
              <Link to={`/tienda/${tienda.tienda_id}`}>VER MAS</Link>
            </>
          ]}>
            <Meta
            title={
              <>
                <p>TELEFONO: {tienda.telefono}</p>
              </>
            }
            description={
              <>
                <p>STOCK: {tienda.total_stock}</p>
                <p>DIRECCION: {tienda.direccion}</p>
              </>
            }/>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Tiendas_cards;

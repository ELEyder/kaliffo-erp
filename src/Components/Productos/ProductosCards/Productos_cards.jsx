import React, { useEffect, useState } from "react";
import { CargarProductos } from "../../../Shared/Funciones/Funciones_Productos";
import { Button, Card, Col, Row, Divider } from "antd";
import { Link } from "react-router-dom";

const {Meta} = Card


const Productos_cards = ({ refrescar }) => {
  const [productos, setTiendas] = useState([]);

  useEffect(() => {
    CargarProductos(setTiendas);
  }, [refrescar]);

  return (
    <>
    <Divider>Productos: {productos.length}</Divider>
    <Row gutter={16}>
      {productos.map((producto, index) => (
        <Col key={index} span={6}
        style={{ margin: "0 0 24px 0" }}
        >
          <Card title={producto.nombre}
          actions={[
            <>
              <Link to={`/producto/${producto.producto_id}`}>VER MAS</Link>
            </>
          ]}
          cover={<img alt="example" src={`/img//${producto.producto_id}.png`} />}
          >
            <Meta
            title={`Precio: S/${producto.precio}`}
            />
            <Meta
            title={`Stock general: ${producto.stockGeneral}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Productos_cards;

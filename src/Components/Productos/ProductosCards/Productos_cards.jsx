import React, { useEffect, useState } from "react";
import { getProductos } from "../../../Shared/api/Producto";
import { Button, Card, Col, Row, Divider } from "antd";
import { Link } from "react-router-dom";

const {Meta} = Card


const Productos_cards = ({ refrescar }) => {
  const [productos, setTiendas] = useState([]);

  useEffect(() => {
    getProductos(setTiendas);
  }, [refrescar]);

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}>
        Productos: {productos.length}
      </Divider>
      <Row gutter={16}>
        {productos.map((producto, index) => {
          const imgSrc = `/img/${producto.producto_id}.png`;
          
          const handleError = (e) => {
            e.target.src = '/img/generic.png';
          };

          return (
            <Col key={index} span={6} style={{ margin: "0 0 24px 0", textAlign: "center" }}>
              <Card
                title={producto.nombre}
                actions={[
                  <Link to={`/producto/${producto.producto_id}`}>VER MAS</Link>
                ]}
                cover={
                  <img
                    src={imgSrc}
                    alt={producto.nombre}
                    onError={handleError}
                    style={{ width: '100%', height: 'auto' }}
                  />
                }
              >
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Precio: S/${producto.precioBase}`}
                />
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Stock general: ${producto.stockTotal}`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Productos_cards;

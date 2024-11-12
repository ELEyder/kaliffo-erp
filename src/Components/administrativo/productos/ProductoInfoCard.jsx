import { Card, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "@A/admi/Producto";

const ProductoInfoCard = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProductoById(id, setProducto);
  }, [id]);

  const imgSrc = `/img/productos/${producto.producto_id}.png`;

  const handleError = (e) => {
    e.target.src = '/img/productos/generic.png';
  };

  return (
    <>
      {producto && (
        <Card
          style={{ maxWidth: 300, textAlign: "center", margin: "auto" }}
          title={producto.nombre}
        >
          <img
            alt="example"
            src={imgSrc}
            onError={handleError} // Maneja el error de la imagen
            style={{ width: "100%", height: "auto" }} // Asegúrate de que la imagen se ajuste al contenedor
          />
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: "STOCK TOTAL", value: producto.stockTotal },
              { title: "PRECIO", value: producto.precioBase },
              { title: "COLORES", value: producto.cantidad_colores },
            ]}
            renderItem={(item) => (
              <List.Item>
                <b>{item.title}</b>
                <span style={{ float: "right" }}>{item.value}</span>
              </List.Item>
            )}
          />
        </Card>
      )}
    </>
  );
}

export default ProductoInfoCard
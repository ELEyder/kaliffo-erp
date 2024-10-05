import { Card, List,Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "../../../Shared/api/Producto";

const ProductoInfoCard = () =>{
  const { id } = useParams();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProductoById(id, setProducto);
  }, [id]);

  const imgSrc = `/img/${producto.producto_id}.png`;
          
  const handleError = (e) => {
    e.target.src = '/img/generic.png';
  };

    return(
        <Card
        style={{ maxwidth: 300, textAlign: "center", margin: "auto" } }
        title={producto.nombre}
        onError={handleError}
        cover={<img alt="example" src={imgSrc} />}
        >
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "STOCK TOTAL", value: producto.stockTotal },
            { title: "PRECIO", value: producto.precioBase },
            { title: "COLORES", value: "Sin Datos" },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
  
      </Card>
    )
}

export default ProductoInfoCard
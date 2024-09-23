import { Card, List,Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CargarProductoPorId } from "../../../Shared/Funciones/Funciones_Producto";

const ProductoInfo = ({ id }) =>{
  const [producto, setProducto] = useState([]);
  useEffect(() => {CargarProductoPorId(id, setProducto)}), [id]
  
    return(
        <Card
        style={{ maxWidth: 300, textAlign: "center", margin: "auto" } }
        title={producto.nombre}
        cover={<img alt="example" src={`/img/${producto.producto_id}.png`} />}
        >
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "STOCK TOTAL", value: producto.stockGeneral },
            { title: "PRECIO", value: producto.precio },
            { title: "COLORES", value: "13,287" },
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

export default ProductoInfo
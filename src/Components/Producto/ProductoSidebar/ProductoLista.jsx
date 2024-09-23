import React from "react";
import { Card, List } from "antd";
import { useParams } from "react-router-dom";

const ProductoLista = () =>{
    return(
        <Card
        style={{ margin: "auto" , textAlign: "center" }}
        title="PRODUCTOS MAS VENDIDOS"
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "STOCK TOTAL", value: "1,322" },
            { title: "Ventas Totales", value: "543" },
            { title: "Personal asignado", value: "13,287" },
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

export default ProductoLista
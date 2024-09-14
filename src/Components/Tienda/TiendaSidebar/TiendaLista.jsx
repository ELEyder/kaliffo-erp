import React from "react";
import { Card, List,Button } from "antd";


const TiendaLista = () =>{
    return(
        <Card
        style={{ width: 300, margin: "auto", textAlign: "center" }}
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

export default TiendaLista
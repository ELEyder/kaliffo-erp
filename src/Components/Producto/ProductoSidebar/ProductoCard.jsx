import { Card, List,Button } from "antd";
import React from "react";

const ProductoCard = () =>{
    return(
        <Card
        style={{ width: 300, margin: "auto", textAlign: "center" }}
        title={"Jean 1"}
        cover={<img alt="example" src="/img/prenda-template.jpg" />}
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
  
        <Button type="primary" block>
          Obtener reporte
        </Button>
      </Card>
    )
}

export default ProductoCard
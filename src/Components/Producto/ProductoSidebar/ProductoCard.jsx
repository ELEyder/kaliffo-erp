import { Card, List,Button } from "antd";
import React from "react";

const ProductoCard = () =>{
    return(
        <Card
        style={{ width: 300, margin: "auto", textAlign: "center" }}
      >
        <h3>Producto 1</h3>
        <p className="text-muted">Jr ajhsahsahsa</p>        
        <p className="text-muted">2312334</p>
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
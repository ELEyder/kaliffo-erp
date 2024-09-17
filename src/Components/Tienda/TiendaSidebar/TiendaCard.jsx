import { Card, List,Button } from "antd";
import React from "react";

const TiendaCard = ({tienda}) =>{
    return(
        <Card
        style={{ width: 300, margin: "auto", textAlign: "center" }}
      >
        <h3>{tienda.tienda}</h3>
        <p className="text-muted">{tienda.direccion}</p>        
        <p className="text-muted">{tienda.telefono}</p>
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "STOCK TOTAL", value: `${tienda.stockTotal}` },
            { title: "Ventas Totales", value: `12`  },
            { title: "Personal asignado", value: `${tienda.nroUsuarios}` },
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

export default TiendaCard
import React from "react";
import { Card, List } from "antd";
import { useParams } from "react-router-dom";

const TrabajadorLista = () =>{
    return(
        <Card
        style={{ maxwidth: 300, margin: "auto" , textAlign: "center" }}
        title="USUARIOS CON MÁS HORAS TRABAJADAS"
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "Rojo", value: "122" },
            { title: "Verde Azul", value: "543" },
            { title: "Amarillo", value: "123" },
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

export default TrabajadorLista
import React from "react";
import { Card, List } from "antd";

const TrabajadorLista = () => {
  return (
    <Card
      // Configuración de estilo para centrar y ajustar el ancho del componente
      style={{ maxWidth: 300, margin: "auto", textAlign: "center" }}
      title="USUARIOS CON MÁS HORAS TRABAJADAS" // Título de la tarjeta
    >
      {/* Lista de usuarios con más horas trabajadas */}
      <List
        itemLayout="horizontal"
        dataSource={[
          { title: "Rojo", value: "122" },
          { title: "Verde Azul", value: "543" },
          { title: "Amarillo", value: "123" },
        ]}
        renderItem={(item) => (
          <List.Item>
            {/* Nombre del usuario */}
            <b>{item.title}</b>
            {/* Valor flotando a la derecha */}
            <a style={{ float: "right" }}>{item.value}</a>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TrabajadorLista;

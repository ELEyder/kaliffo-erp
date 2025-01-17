import { Card, Dropdown, List, Button, Image, Divider, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrabajadorById } from "@AA/Usuario";
import { getReporteUsuario } from "@AA/Reporte";

const { Meta } = Card;

const TrabajadorInfo = () => {
  const items = [
    {
      key: "1",
      label: "Historico",
    },
    {
      key: "2",
      label: "Ultimo Mes",
    },
  ];

  const { id } = useParams(); // Obtiene el ID del trabajador desde los parámetros de la URL
  const [usuario, setUsuario] = useState([]); // Estado para almacenar la información del trabajador

  useEffect(() => {
    getTrabajadorById(id, setUsuario); // Carga los datos del trabajador por ID al montar el componente
  }, [id]);

  // Lista de imágenes específicas para un usuario en particular
  const [images, setImages] = useState([
    "eyder1.jpg",
    "eyder2.jpg",
    "eyder3.jpg",
    "eyder4.jpg",
    "eyder5.gif",
  ]);

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      title={`${usuario.nombre} ${usuario.ap_paterno} ${usuario.ap_materno}`} // Título de la tarjeta
      cover={
        <Image
          width="100%"
          height="auto"
          // Selección dinámica de imágenes según el nombre del usuario
          src={
            usuario.nombre === "Rodrigo"
              ? `/img/usuarios/rodrigo.jpg`
              : usuario.nombre === "Pablo"
              ? `/img/usuarios/pablo.jpg`
              : usuario.nombre === "Eyder"
              ? `/img/usuarios/${images[Math.floor(Math.random() * 5)]}`
              : `/img/usuarios/${usuario.usuario_id}.jpg`
          }
          fallback="/img/usuarios/0.jpg" // Imagen predeterminada si falla la carga
        />
      }
    >
      {/* Lista de detalles del trabajador */}
      <List
        itemLayout="horizontal"
        dataSource={[
          { title: "DNI", value: usuario.dni },
          { title: "TELÉFONO", value: usuario.telefono },
          { title: "HORAS TRABAJADAS", value: usuario.total_horas_trabajadas },
          { title: "NUM. INCIDENCIAS", value: usuario.total_incidencias },
          { title: "SALARIO", value: "S/ " + usuario.sueldo },
        ]}
        renderItem={(item) => (
          <List.Item>
            {/* Título y valor de cada propiedad */}
            <b style={{ textAlign: "left", marginRight: "40px" }}>
              {item.title}
            </b>
            <a style={{ float: "right" }}>{item.value}</a>
          </List.Item>
        )}
      />

      <Divider />

      {/* Botón para obtener el reporte del usuario */}
      <Row justify="center" align="middle">
        <Col>
          <Dropdown.Button
            menu={{ items, onClick: ({ key }) => getReporteUsuario(id, key) }}
            block
            size="large"
            style={{ fontWeight: "bold" }}
          >
            OBTENER REPORTE
          </Dropdown.Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrabajadorInfo;

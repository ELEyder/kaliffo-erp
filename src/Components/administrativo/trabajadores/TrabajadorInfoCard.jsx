import { Card, List,Button, Image, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrabajadorById } from "@AA/Usuario";
import { getReporteUsuario } from "@AA/Reporte";
const {Meta} = Card

const TrabajadorInfo = () =>{
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    getTrabajadorById(id, setUsuario);
  }, [id]);
  const [images, setImages] = useState([
    "eyder1.jpg", "eyder2.jpg", "eyder3.jpg", "eyder4.jpg", "eyder5.gif",
  ]);
    return(
        <Card
        style={{ width: 300, textAlign: "center" } }
        title={`${usuario.nombre} ${usuario.ap_paterno} ${usuario.ap_materno}`}
        cover={
          <Image
          width={"100%"}
          height={'auto'}
          src={usuario.nombre==="Rodrigo" ? `/img/usuarios/rodrigo.jpg` : usuario.nombre==="Pablo" ? `/img/usuarios/pablo.jpg` : usuario.nombre==="Eyder" ? `/img/usuarios/${images[Math.floor(Math.random() * 5)]}` : `/img/usuarios/${usuario.usuario_id}.jpg`}
          fallback="/img/usuarios/0.jpg"
        />
      }
        >
            {/* <Meta
              title={<p>Más información</p>}
              /> */}
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "DNI", value: usuario.dni },
            { title: "TELÉFONO", value: usuario.telefono },
            { title: "HORAS TRABAJADAS", value: usuario.total_horas_trabajadas},  
            { title: "NUM. INCIDENCIAS", value: usuario.total_incidencias },
            { title: "SALARIO", value: "S/ " + usuario.sueldo },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b style={{ textAlign: 'left', marginRight: "40px" }}>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
        <Divider></Divider>
       <Button type="primary" onClick={() => getReporteUsuario(id)} block style={{fontWeight:"bold"}}>
          OBTENER REPORTE
        </Button>

      </Card>
    )
}

export default TrabajadorInfo
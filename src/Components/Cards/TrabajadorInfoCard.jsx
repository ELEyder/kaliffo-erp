import { Card, List,Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsuarioById } from "../../API/Usuario";
import { getReporteUsuario } from "../../API/Reporte";
const {Meta} = Card

const TrabajadorInfo = () =>{
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    getUsuarioById(id, setUsuario);
  }, [id]);

    return(
        <Card
        style={{ width: 300, textAlign: "center" } }
        title={`${usuario.nombre} ${usuario.ap_paterno} ${usuario.ap_materno}`}
        cover={
          <Image
          width={"100%"}
          height={'auto'}
          src={`/img/usuarios/${usuario.usuario_id}.png`}
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
              <b style={{ textAlign: 'left', marginRight: "5px" }}>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
       <Button type="primary" onClick={() => getReporteUsuario(id)} block>
          Obtener reporte
        </Button>

      </Card>
    )
}

export default TrabajadorInfo
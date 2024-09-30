import { Card, List,Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsuarioById } from "../../../Shared/Funciones/Funciones_Usuario";
import { GetReporteUsuario } from "../../../Shared/Funciones/Funciones_Fetch";

const TrabajadorInfo = () =>{
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    getUsuarioById(id, setUsuario);
  }, [id]);

  const imgSrc = `/img/usuarios/${usuario.usuario_id}.png`;
          
  const handleError = (e) => {
    e.target.src = '/img/usuarios/1.png';
  };
    return(
        <Card
        style={{ maxwidth: 300, textAlign: "center", margin: "auto" } }
        title={`${usuario.nombre} ${usuario.ap_paterno} ${usuario.ap_materno}`}
        onError={handleError}
        cover={<img alt="example" src={imgSrc} />}
        >
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "DNI", value: usuario.dni },
            { title: "TELÉFONO", value: usuario.telefono },
            { title: "HORAS TRABAJADAS", value: "Sin datos" },  
            { title: "NUM. INCIDENCIAS", value: usuario.nroIncidencias },
            { title: "SALARIO", value: "Sin datos" },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
       <Button type="primary" onClick={() => GetReporteUsuario(id)} block>
          Obtener reporte
        </Button>

      </Card>
    )
}

export default TrabajadorInfo
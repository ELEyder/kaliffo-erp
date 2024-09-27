import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getIncidenciasById } from "../../../../Shared/Funciones/Funciones_Usuario";

const TablaIncidencias = ({ id }) =>{
    const columns=[
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            align:"center",
        },
        {
            title: "Incidencia",
            dataIndex: "incidencia",
            key: "incidencia",
            align:"center",
            onCell: (record) => ({
              style: {
                background: record.incidencia === "Familiar" 
                  ? '#FCFB77' 
                  : record.incidencia === "Personal" 
                  ? 'orange' 
                  : '#f54242',
                color: record.incidencia === "Salud" ? "white" : "black",
                padding: "10px"
              }
            }),
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
            align:"center", 
        },
        {
          title: "Fecha",
          dataIndex: "fecha_creacion",
          key: "fecha_creacion",
          align:"center",
      },
        {
            title: "Opciones",
            key: "opciones",
            align:"center",
            render:(text,record) =>{
              return (
                  <Row gutter={[8, 8]} justify="center" align="middle">
                      <Col>
                          <Button type="primary" block>Editar</Button>
                      </Col>
                      <Col>
                          <Popconfirm
                              title="ELIMINAR"
                              description="DESEA ELIMINAR A"
                              okText="Confirmar"
                              cancelText="NO"
                          >
                              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                          </Popconfirm>
                      </Col>
                  </Row>
              );
          }
        },
    ]
    const [tabla, setTabla] = useState();

    useEffect(() => {
      getIncidenciasById(id , setTabla);
      }, [id]);

    return(
       <>
         <Table
        columns={columns}
        dataSource={tabla}
        pagination={{ pageSize: 5 }}
        >

        </Table>
       </>
    )
}

export default TablaIncidencias
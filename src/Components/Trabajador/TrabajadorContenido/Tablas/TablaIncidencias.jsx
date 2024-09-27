import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getIncidenciasById, deleteIncidenciaById } from "../../../../Shared/Funciones/Funciones_Usuario";
import Modal_editar_incidencia from "../Modals/Modal_editar_incidencia";
// import { Modal_añadir} from "../Modals/Modal_añadir";

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
                          <Button type="primary"
                          block
                          onClick={(e) => {
                            setIncidencia(record)
                            setModalEditarAbierto(true)
                          }}
                          >
                            Editar
                          </Button>
                      </Col>
                      <Col>
                          <Popconfirm
                              title="ELIMINAR"
                              description="DESEA ELIMINAR A"
                              okText="Confirmar"
                              cancelText="NO"
                              onConfirm={(e) => {
                                deleteIncidenciaById(record.incidencia_id, reload, setReload)
                              }}
                          >
                              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                          </Popconfirm>
                      </Col>
                  </Row>
              );
          }
        },
    ]

    const [tabla, setTabla] = useState([]);
    const [incidencia, setIncidencia] = useState([]);
    const [reload, setReload] = useState(false);
    const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);

    useEffect(() => {
      getIncidenciasById(id , setTabla);
      }, [id, reload]);

    return(
       <>
         <Table
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
        pagination={{ pageSize: 5 }}
        >

        </Table>
        <Modal_editar_incidencia
        ModalEditarAbierto = {ModalEditarAbierto}
        setModalEditarAbierto = {setModalEditarAbierto}
        setReload = {setReload}
        reload = {reload}
        values = {incidencia}
        />
       </>
    )
}

export default TablaIncidencias
  import { Table, Button, Popconfirm, Row, Col, FloatButton } from "antd";
  import { FileAddOutlined } from '@ant-design/icons';
  import React from "react";
  import { useState, useEffect } from 'react'
  import { getIncidenciasById, deleteIncidenciaById } from "../../../../Shared/Funciones/Incidencia";
  import Modal_editar_incidencia from "../Modals/Modal_editar_incidencia";
  import Modal_add_incidencia from "../Modals/Modal_add_incidencia";

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
              sorter: {
                compare: (a, b) => a.incidencia.localeCompare(b.incidencia),
                multiple: 2,
              },
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
      const [ModalAddIncidenciaOpen, setModalAddIncidenciaOpen] = useState(false);

      useEffect(() => {
        getIncidenciasById(id , setTabla);
        }, [id, reload]);

      return(
        <>
        <Row justify = "end">
          </Row>
          <Table
          columns={columns}
          dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
          pagination={{ pageSize: 5 }}
          >

          </Table>
          
          <FloatButton tooltip="Añadir Nuevo Pago" onClick={() => setModalAddIncidenciaOpen(true)} type="primary" icon={<FileAddOutlined />}/>

          <Modal_editar_incidencia
          ModalEditarAbierto = {ModalEditarAbierto}
          setModalEditarAbierto = {setModalEditarAbierto}
          setReload = {setReload}
          reload = {reload}
          values = {incidencia}
          />
          <Modal_add_incidencia
          ModalAddOpen = {ModalAddIncidenciaOpen}
          setModalAddOpen = {setModalAddIncidenciaOpen}
          setReload = {setReload}
          reload = {reload}
          idUsuario = {id}
          />


        </>
      )
  }

  export default TablaIncidencias
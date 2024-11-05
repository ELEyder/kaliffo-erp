  import { Table, Button, Popconfirm, Row, Col, FloatButton, notification } from "antd";
import { useParams } from 'react-router-dom'
import { FileAddOutlined } from '@ant-design/icons';
  import React from "react";
  import { useState, useEffect } from 'react'
  import { getIncidenciasById, deleteIncidenciaById } from "../../API/Incidencia";
  import UpdateIncidenciaModal from "../Modals/UpdateIncidenciaModal";
  import AddIncidenciaModal from "../Modals/AddIncidenciaModal";

  const TablaIncidencias = () =>{
    const { id } = useParams();
    const [tabla, setTabla] = useState([]);
    const [incidencia, setIncidencia] = useState([]);
    const [reload, setReload] = useState(false);
    const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [ModalAddIncidenciaOpen, setModalAddIncidenciaOpen] = useState(false);

    useEffect(() => {
      getIncidenciasById(id , setTabla);
      }, [id, reload]);

      const columns=[
          { title: "N°", dataIndex: "id", key: "id", align:"center" },
          { title: "Incidencia", dataIndex: "incidencia", key: "incidencia", align:"center",
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
              }},
          { title: "Descripción", dataIndex: "descripcion", key: "descripcion", align:"center"},
          { title: "Fecha", dataIndex: "fecha_creacion", key: "fecha_creacion", align:"center"},
          { title: "Opciones", key: "opciones", align:"center",
              render:(text,record) =>{
                return (
                    <Row gutter={[8, 8]} justify="center" align="middle">
                        <Col>
                            <Button type="primary"
                            block
                            onClick={() => {
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
                                description="DESEA ELIMINAR ESTA INCIDENCIA"
                                okText="Confirmar"
                                cancelText="NO"
                                onConfirm={() => {
                                  deleteIncidenciaById(record.incidencia_id)
                                  setReload(!reload)
                                }}>
                                <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                            </Popconfirm>
                        </Col>
                    </Row>
                );
            }
          },
      ]



      return(
        <>
          <Table
          columns={columns}
          dataSource={tabla?.map((item, index) => ({ ...item, key: index }))}
          pagination={{ pageSize: 5 }}
          >

          </Table>
          
          <FloatButton tooltip="Añadir Nueva Incidencia" onClick={() => setModalAddIncidenciaOpen(true)} type="primary" icon={<FileAddOutlined />}/>

          <UpdateIncidenciaModal
          openModal = {ModalEditarAbierto}
          closeModal = {()=>setModalEditarAbierto(false)}
          reload = {() => setReload(!reload)}
          values = {incidencia}
          />
          <AddIncidenciaModal
          openModal = {ModalAddIncidenciaOpen}
          closeModal = {() => setModalAddIncidenciaOpen(false)}
          reload = {() => setReload(!reload)}
          id = {id}
          />


        </>
      )
  }

  export default TablaIncidencias
import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getPagosById, deletePagoById } from "../../../../Shared/Funciones/Pago";
import Modal_add_pago from "../Modals/Modal_add_pago";

const TablaPagos = ({ id }) =>{
    const columns=[
        {
          title: "Monto Pagado",
          dataIndex: "montoPagado",
          key: "montoPagado",
          align:"center",
          render: (text) => {
            return (
              "S/" + text
            )
          }
        },
        {
          title: "Monto Faltante",
          dataIndex: "montoFaltante",
          key: "montoFaltante",
          align:"center",
          render: (text) => {
            return (
              "S/" + text
            )
          }
        },
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
          align:"center",
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            align:"estado",
            onCell: (record) => ({
              style: {
                background: record.estado === "En Proceso" 
                  ? '#FCFB77' 
                  : 'green',
                color: record.estado === "En Proceso" ? "black" : "white",
                padding: "10px"
              }
            }),
            },
         {
            title: "Opciones",
            key: "opciones",
            align:"center",
            render:(text,record) =>{
              return (
                  <Row gutter={[8, 8]} justify="center" align="middle">
                      {/* <Col>
                          <Button type="primary"
                          block
                          onClick={(e) => {
                            setPago(record)
                            setModalEditarAbierto(true)
                          }}
                          >Editar</Button>
                      </Col> */}
                      <Col>
                          <Popconfirm
                              title="ELIMINAR"
                              description="DESEA ELIMINAR A"
                              okText="Confirmar"
                              cancelText="NO"
                              onConfirm={(e) => {
                                deletePagoById(record.pago_id, reload, setReload)
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
    const [reload, setReload] = useState(false);
    const [ModalAddPagoOpen, setModalAddPagoOpen] = useState(false);

    useEffect(() => {
        getPagosById(id , setTabla);
      }, [id, reload]);

    return(
       <>
         <Table
         ali
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
        pagination={{ pageSize: 5 }}
        >

        </Table>


        <Modal_add_pago
          ModalAddOpen = {ModalAddPagoOpen}
          setModalAddOpen = {setModalAddPagoOpen}
          setReload = {setReload}
          reload = {reload}
          idUsuario = {id}
          />
       </>
    )
}

export default TablaPagos
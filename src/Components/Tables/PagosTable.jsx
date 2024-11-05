import { Table, Button, Popconfirm, Row, Col, FloatButton } from "antd";
import { useParams } from 'react-router-dom'
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from 'react'
import { getPagosById, deletePagoById } from "../../API/Pago";
import AddPagoModal from "../Modals/AddPagoModal";

const TablaPagos = () =>{
  const { id } = useParams();

  const [tabla, setTabla] = useState([]);
  const [reload, setReload] = useState(false);
  const [OpenAddPago, setOpenAddPago] = useState(false);

  useEffect(() => {
      getPagosById(id , setTabla);
    }, [id, reload]);

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
            sorter: {
              compare: (a, b) => a.estado.localeCompare(b.estado),
              multiple: 2,
            },
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
                                deletePagoById(record.pago_id)
                                setReload(!reload)
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

    return(
       <>
         <Table
         ali
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
        pagination={{ pageSize: 5 }}
        >

        </Table>

        <FloatButton
          icon={<PlusOutlined />}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            position: "fixed",
            top: "120px",
            right: "60px",
          }}
          tooltip={"Añadir Pago"}
          onClick={()=>setOpenAddPago(true)}
        />
        <AddPagoModal
          openModal = {OpenAddPago}
          closeModal = {()=>setOpenAddPago(false)}
          reload = {()=>setReload(!reload)}
          idUsuario = {id}
          />
       </>
    )
}

export default TablaPagos
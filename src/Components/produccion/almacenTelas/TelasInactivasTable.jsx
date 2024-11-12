import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Table, Button, Popconfirm, Row, Col } from "antd";
import { deleteTelaById, getTelasInactivas } from "@A/prod/Tela";

const TelasInactivasTable = () => {

  const { tipo } = useParams()
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    getTelasInactivas(tipo, setTabla);
  }, [tipo]);

  const columns = [
      {
        title: "N",
        dataIndex: "n",
        key: "n",
        align: "center",
      },
      {
        title: "Metraje",
        dataIndex: "metraje",
        key: "metraje",
        align: "center",
      },
      {
        title: "Artículo",
        dataIndex: "articulo",
        key: "articulo",
        align: "center",
      },
      {
        title: "Empresa Compra",
        dataIndex: "empresa_compra",
        key: "empresa_compra",
        align: "center",
      },
      {
        title: "Fecha de Compra",
        dataIndex: "fecha_compra",
        key: "fecha_compra",
        align: "center",
      },
      {
        title: "Opciones",
        dataIndex: "tela_id",
        key: "opciones",
        align: "center",
        render: (text) => {
          return (
            <Row gutter={[8, 8]} justify="center" align="middle">
              <Col>
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  cancelText="NO"
                  onConfirm={()=> {
                    deleteTelaById(text)
                    setReaload(!reload)
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

  return (
    <>
      <Table
        ali
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} >
      </Table>
    </>
  )
}

export default TelasInactivasTable
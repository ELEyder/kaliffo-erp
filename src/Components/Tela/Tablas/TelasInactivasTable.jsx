import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Table, Button, Popconfirm, Row, Col } from "antd";
import { getTelasInactivas } from "../../../Shared/api/Tela";

const TelasInactivasTable = () => {

  const { id } = useParams()
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    getTelasInactivas(setTabla);
  }, [id]);

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
        dataIndex: "empresaCompra",
        key: "empresaCompra",
        align: "center",
      },
      {
        title: "Fecha de Compra",
        dataIndex: "fechaCompra",
        key: "fechaCompra",
        align: "center",
      },
    {
      title: "Opciones",
      key: "opciones",
      align: "center",
      render: (text, record) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
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
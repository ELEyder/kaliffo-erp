import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getTiendasByProducto } from "../../../Shared/api/Tienda";

const ProductoTiendasTable = () => {

  const [id, setId] = useState(1)
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    getTiendasByProducto(id, setTabla);
  }, [id]);

  const columns = [
    {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
      align: "center",
    },
    {
      title: "Stock Total",
      dataIndex: "STOCK",
      key: "STOCK",
      align: "center",
      onCell: (record) => ({
        style: {
          background: record.stock >= 50
            ? 'green'
            : record.stock <= 20
              ? '#f54242'
              : '#FCFB77',
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
          padding: "10px"
        }
      }),
    },
    {
      title: "Ver más",
      key: "verMas",
      align: "center",
      render: (text, record) => {
        return (
          <Button type="primary" block>+</Button>
        )
      },
    },
    {
      title: "Opciones",
      key: "opciones",
      align: "center",
      render: (text, record) => {
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
  return (
    <>
      <Table
        ali
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
      >
      </Table>
    </>
  )
}

export default ProductoTiendasTable
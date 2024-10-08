import React from "react";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getColoresByProducto } from "../../../Shared/api/Color";
import { Table, Button, Popconfirm, Row, Col } from "antd";

const ProductoColoresTable = () => {
  const { id } = useParams();

  const [tabla, setTabla] = useState([]);
  useEffect(() => {
    getColoresByProducto(id, setTabla);
  }, [id]);
  
  const columns = [
    {
      title: "Color",
      dataIndex: "color_nombre",
      key: "color_nombre",
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      sorter: {
        compare: (a, b) => a.stock - b.stock,
        multiple: 2,
      },
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
      render: () => {
        return (
          <Button type="primary" style={{ width: "55px" }}>+</Button>
        )
      },
    },
    {
      title: "Opciones",
      key: "opciones",
      align: "center",
      width: '300px',
      render: (text, record) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
              <Button type="primary">Editar</Button>
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

export default ProductoColoresTable
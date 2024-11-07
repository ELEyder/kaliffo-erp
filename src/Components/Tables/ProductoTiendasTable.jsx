import React from "react";
import { useParams } from "react-router-dom"
import { Table, Button, Popconfirm, Row, Col } from "antd";
import { useState, useEffect } from 'react'
import { getTiendasByProducto } from "../../API/Tienda";

const ProductoTiendasTable = () => {

  const { id } = useParams()
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
          <Button type="primary" style={{ width: "55px" }}>+</Button>
        )
      },
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
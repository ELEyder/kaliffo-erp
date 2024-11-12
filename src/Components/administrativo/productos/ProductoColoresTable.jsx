import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { getColoresByProducto } from "@AA/Color";
import { Table, Button, Popconfirm, Row, Col } from "antd";

const ProductoColoresTable = () => {

  const { id } = useParams()

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
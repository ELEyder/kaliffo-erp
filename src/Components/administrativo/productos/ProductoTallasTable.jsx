import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Table, Button } from "antd";
import { getTallasByProducto } from "@AA/Talla";

const ProductoTallasTable = () => {

  const { id } = useParams()
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    getTallasByProducto(id, setTabla);
  }, [id]);

  const columns = [
    {
      title: "Talla",
      dataIndex: "talla",
      key: "talla",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
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
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} >
      </Table>
    </>
  )
}

export default ProductoTallasTable
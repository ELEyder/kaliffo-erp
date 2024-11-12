import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { getVentaById } from "@AA/Ventas";
const DetalleVentaTable = ({
  id,
  data
}) => {
  const [tablaDatos, setTablaDatos] = useState([]);
  
  useEffect(() => {
    getVentaById(id, setTablaDatos);
  }, [id]);

  const columnas = [
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
        align: "center",
      },
      {
        title: "Código",
        dataIndex: "codigo",
        key: "codigo",
        align: "center",
      },
      {
        title: "Cantidad",
        dataIndex: "cantidad",
        key: "cantidad",
        align: "center",
      },
      {
        title: "Precio Unitario",
        dataIndex: "precioUnitario",
        key: "precioUnitario",
        align: "center",
        render: (text) =>{
          return (
            `S/${text}`
          )}
      },
      {
        title: "Precio Total",
        dataIndex: "precioTotal",
        key: "precioTotal",
        align: "center",
        render: (text) =>{
          return (
            `S/${text}`
          )}
      },
      {
        title: "IGV",
        dataIndex: "igv",
        key: "igv",
        align: "center",
      },
      {
        title: "Neto",
        dataIndex: "precioNeto",
        key: "precioNeto",
        align: "center",
        render: (text) =>{
          return (
            `S/${text}`
          )}
      },
  ];

  return (
    <>
      <Table
        columns={columnas}
        dataSource={tablaDatos?.detalles?.map((item, index) => ({ ...item, key: index }))}
        rowKey={(record) => record.id}
        bordered
      />
    </>
  );
};

export default DetalleVentaTable;
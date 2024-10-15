import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetalleVentaModal from "../Modals/DetalleVentaModal";
import AddVentaModal from "../Modals/AddVentaModal"
import { getVentas, deleteVenta } from "../../../Shared/api/Ventas";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import { getVentaById } from "../../../Shared/api/Ventas";
const DetalleVentaTable = ({
  id
}) => {
  const [tablaDatos, setTablaDatos] = useState([]);
  
  useEffect(() => {
    getVentaById(id, setTablaDatos);
  }, [id]);

  const columnas = [
      {
        title: "Nº",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
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
        dataIndex: "precio_u",
        key: "precio_u",
        align: "center",
      },
      {
        title: "Precio Total",
        dataIndex: "preciototal",
        key: "preciototal",
        align: "center",
      },
      {
        title: "IGV",
        dataIndex: "igv",
        key: "igv",
        align: "center",
      },
      {
        title: "Neto",
        dataIndex: "neto",
        key: "neto",
        align: "center",
      },
  ];

  return (
    <>
      <Table
        columns={columnas}
        dataSource={tablaDatos.map((item, index) => ({ ...item, key: index }))}
        rowKey={(record) => record.id}
        bordered
      />
    </>
  );
};

export default DetalleVentaTable;
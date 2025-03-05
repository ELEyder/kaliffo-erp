import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const Tabla = ({ columnas, rowKey, dataSource = [], loading = false }) => {
  const navigate = useNavigate();

  const getSorter = (col) => {
    return col.dataIndex === "id" || col.title === "Opciones"
      ? 0
      : (a, b) => {
          if (
            typeof a[col.dataIndex] === "string" &&
            typeof b[col.dataIndex] === "string"
          ) {
            return a[col.dataIndex].localeCompare(b[col.dataIndex]);
          } else if (
            typeof a[col.dataIndex] === "number" &&
            typeof b[col.dataIndex] === "number"
          ) {
            return a[col.dataIndex] - b[col.dataIndex];
          } else {
            return 0; // Si no son comparables, no ordenamos
          }
        };
  };

  columnas = columnas.map((col) => ({
    ...col,
    align: "center",
    key: col.title,
    sorter: getSorter(col),
  }));
  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      onRow={(record) => {
        let path = null;
        if (record.trabajador_id)
          path = `/administrativo/trabajadores/${record.trabajador_id}`;
        else if (record.producto_id)
          path = `/administrativo/productos/${record.producto_id}`;
        else if (record.venta_id) path = `/administrativo/venta/${record.venta_id}`;
        else if (record.almacen_id) path = `/logistico/almacen/${record.almacen_id}`;

        return path
          ? { onClick: () => navigate(path), style: { cursor: "pointer" } }
          : { style: { cursor: "default" } };
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default Tabla;

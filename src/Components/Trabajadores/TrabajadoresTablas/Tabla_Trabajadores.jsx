import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FetchDataTablaTrabajadores } from "../../../Shared/Funciones/Funciones_Fetch";

const columnas = [
  {
    title: "Nombre",
    key: "nombre",
    render: (text, record) =>
      `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
  },
  {
    title: "DNI",
    dataIndex: "dni",
    key: "dni",
    defaultSortOrder: "ascend",
    sorter: {
      compare: (a, b) => a.dni.localeCompare(b.dni),
      multiple: 1,
    },
  },
  {
    title: "Teléfono",
    dataIndex: "telefono",
    key: "telefono",
    defaultSortOrder: "ascend",
    sorter: {
      compare: (a, b) => a.telefono.localeCompare(b.telefono),
      multiple: 2,
    },
  },
  {
    title: "Opciones",
    dataIndex: "",
    key: "x",
    render: () => <a href="">Editar</a>,
  },
];

const Tabla_Trabajadores = ({ tipo_trabajador }) => { 
  const [tabla_datos, SetTabla_datos] = useState([]);

  useEffect(() => {
    FetchDataTablaTrabajadores(tipo_trabajador, SetTabla_datos);
  }, [tipo_trabajador]);

  return (
    <Table
      columns={columnas}
      dataSource={[...tabla_datos]}
      rowKey={(record) => record.dni} 
    />
  );
};

export default Tabla_Trabajadores;

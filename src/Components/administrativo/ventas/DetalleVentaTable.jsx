import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { getVentaById } from "@AA/Ventas"; // Función para obtener datos de una venta por ID

const DetalleVentaTable = ({
  id, // ID de la venta que se utilizará para obtener los datos
  data, // Propiedad opcional (no parece ser utilizada aquí)
}) => {
  const [tablaDatos, setTablaDatos] = useState([]); // Estado para almacenar los datos de la tabla

  // Efecto para obtener los datos de la venta al montar el componente o cuando cambie el ID
  useEffect(() => {
    getVentaById(id, setTablaDatos); // Carga los datos de la venta y actualiza el estado
  }, [id]);

  // Definición de las columnas para la tabla
  const columnas = [
    {
      title: "Nombre", // Encabezado de la columna
      dataIndex: "nombre", // Clave del objeto que corresponde a esta columna
      key: "nombre", // Identificador único para la columna
      align: "center", // Alineación del contenido
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
      render: (text) => `S/${text}`, // Formato personalizado para el contenido
    },
    {
      title: "Precio Total",
      dataIndex: "precioTotal",
      key: "precioTotal",
      align: "center",
      render: (text) => `S/${text}`,
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
      render: (text) => `S/${text}`,
    },
  ];

  return (
    <>
      <Table
        scroll={{ x: 'min-content' }}
        columns={columnas} // Columnas definidas anteriormente
        dataSource={tablaDatos?.detalles?.map((item, index) => ({
          ...item,
          key: index, // Agrega una clave única basada en el índice
        }))}
        rowKey={(record) => record.id} // Identificador único de cada fila
        bordered // Bordes visibles en la tabla
      />
    </>
  );
};

export default DetalleVentaTable;

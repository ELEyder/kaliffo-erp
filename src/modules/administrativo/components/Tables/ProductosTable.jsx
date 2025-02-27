import React, { useEffect, useState } from "react"; // Importaciones de React
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto
import { getProductosByTienda } from "@AA/Producto"; // Función API para obtener los productos de una tienda específica
import { Button } from "antd"; // Componentes de Ant Design
import { Tabla } from "../../../../Components/UI";
import useProductos from "../../hooks/useProductos";
import Loading from "../../../../Components/Loading/Loading";

const ProductosTable = () => {
  const { productos, loading } = useProductos()

  const columnas = [
    { title: "Producto", dataIndex: "nombre" },
    {
      title: "Stock", // Título de la columna para el stock
      dataIndex: "stockTotal", // Mapear la columna al campo "stock" en los datos
      onCell: (record) => ({
        style: {
          background: record.stock >= 50 ? 'green' : // Verde para stock >= 50
            record.stock <= 20 ? '#f54242' : // Rojo para stock <= 20
            '#FCFB77', // Amarillo para stock intermedio
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto basado en el stock
          padding: "10px",
        },
      }),
    },
    {
      title: "Precio", // Título de la columna para el precio
      dataIndex: "precioBase", // Mapear la columna al campo "precioBase" en los datos
      render: (text) => `S/ ${text}`, // Formatear el precio como "S/ [precio]"
    },
    {
      title: "Descuento", // Título de la columna para el descuento
      dataIndex: "descuento", 
      render: (text) => `${text}%`, // Mostrar el descuento como porcentaje
      onCell: (record) => ({
        style: {
          background: record.descuento <= 10 ? 'green' : // Verde para descuento <= 10%
            record.descuento >= 20 ? '#f54242' : // Rojo para descuento >= 20%
            '#FCFB77', // Amarillo para descuento intermedio
          color: record.descuento <= 10 || record.descuento >= 20 ? "white" : "black", // Ajustar el color del texto basado en el descuento
          padding: "10px",
        },
      }),
    },
  ];

  if (loading) return <Loading/>
  
  return (
    <>
      <Tabla 
        columnas={columnas} // Pasar la definición de columnas
        rowKey={"producto_id"}
        dataSource={productos} // Mapear los datos con claves únicas
      />
    </>
  );
};

export default ProductosTable; // Exportar el componente ProductosTable

import { Button } from "antd";
import apiClient from "../API/apiClient";

export const getColumnas = (changeModal, setIdP, reload) => {
// Definir las columnas para la tabla de productos
const columnas = [
  {
    title: "Producto", // Título de la columna para el nombre del producto
    key: "nombre",
    dataIndex: "nombre", // Mapear la columna al campo "nombre" en los datos
    align: "center", // Alinear el texto al centro
  },
  {
    title: "Stock", // Título de la columna para el stock
    key: "stock", 
    align: "center",
    dataIndex: "stock", // Mapear la columna al campo "stock" en los datos
    defaultSortOrder: "ascend", // Orden de clasificación por defecto
    // Estilo de la celda basado en los niveles de stock
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
    key: "precioBase", 
    dataIndex: "precioBase", // Mapear la columna al campo "precioBase" en los datos
    align: "center",
    render: (text) => `S/ ${text}`, // Formatear el precio como "S/ [precio]"
  },
  {
    title: "Descuento", // Título de la columna para el descuento
    dataIndex: "descuento", 
    key: "descuento", 
    align: "center",
    render: (text) => `${text}%`, // Mostrar el descuento como porcentaje
    // Estilo de la celda basado en el nivel de descuento
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
  {
    title: "Ver más", // Título de la columna para el botón "Ver más"
    dataIndex: "producto_id", 
    key: "vermas", 
    align: "center",
    // Renderizar el botón de "Ver más" para cada producto
    render: (text, record) => {
      return (
        <Button type="primary" block
          onClick={() => {
            setIdP(text); // Establecer el ID del producto seleccionado
            changeModal("proD", true); // Abrir el modal de detalles del producto
          }}
        >
          +
        </Button>
      );
    },
  },
];


  return columnas
}

export const getUrl = (id) => {
  return `producto?tienda_id=${id}`
}
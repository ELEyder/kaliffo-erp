import React, { useEffect, useState } from "react"; // Importaciones de React
import { useParams } from 'react-router-dom'; // Hooks de React Router para los parámetros de la URL
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto
import { getProductosByTienda } from "@AA/Producto"; // Función API para obtener los productos de una tienda específica
import { Button, Table } from "antd"; // Componentes de Ant Design
import { Tabla } from "../../../../Components/UI";

const ProductosTable = ( {id}) => {
  const [productostienda, setproductostienda] = useState([]); // Estado para almacenar los productos de la tienda
  const [reload, setReload] = useState(false); // Estado para disparar la recarga de datos
  const [OpenTiendaDetalleProducto, setOpenTiendaDetalleProducto] = useState(false); // Estado para controlar la visibilidad del modal de detalles del producto
  const [idp, setIdP] = useState(0); // Estado para almacenar el ID del producto seleccionado para el modal
  const [nombreProducto, setNombreProducto] = useState(''); // Estado para almacenar el nombre del producto seleccionado para el modal

  // Obtener los productos de la tienda cuando el componente se monta o cuando cambia el estado de recarga
  useEffect(() => {
    getProductosByTienda(id, setproductostienda); // Obtener los productos de la tienda según el ID
  }, [id, reload]); // Las dependencias incluyen el ID de la tienda y el estado de recarga

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

  return (
    <>
      {/* Tabla que muestra la lista de productos para la tienda seleccionada */}
      <Tabla 
        columnas={columnas} // Pasar la definición de columnas
        rowKey={"producto_id"}
        dataSource={productostienda} // Mapear los datos con claves únicas
      />

      <ProductoDetalleModal
        openModal={OpenTiendaDetalleProducto} // Visibilidad del modal
        closeModal={setOpenTiendaDetalleProducto} // Función para cerrar el modal
        id={id} // Pasar el ID de la tienda
        idp={idp} // Pasar el ID del producto seleccionado
        nombreProducto={nombreProducto} // Pasar el nombre del producto seleccionado
      />
    </>
  );
};

export default ProductosTable; // Exportar el componente ProductosTable

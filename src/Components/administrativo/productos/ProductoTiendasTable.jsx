import React from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { useState, useEffect } from 'react';
import { getTiendasByProducto } from "@AA/Tienda"; // Importar función para obtener tiendas por producto
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para detalles de la tienda

const ProductoTiendasTable = () => {
  // Obtener el ID del producto desde los parámetros de la URL
  const { id } = useParams();
  
  const [idT, setIdT] = useState(0); // Estado para almacenar el ID de la tienda seleccionada
  const [OpenTiendaDetalleProducto, setOpenTiendaDetalleProducto] = useState(false); // Estado para controlar la visibilidad del modal
  const [tabla, setTabla] = useState([]); // Estado para los datos de la tabla

  // Efecto que se ejecuta cuando el ID del producto cambia
  useEffect(() => {
    getTiendasByProducto(id, setTabla); // Obtener los datos de las tiendas para el producto
  }, [id]);

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: "Tienda", // Título de la columna
      dataIndex: "tienda", // Campo de datos a mostrar
      key: "tienda", // Clave única para la columna
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Stock Total", // Título de la columna
      dataIndex: "STOCK", // Campo de datos a mostrar
      key: "STOCK", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      onCell: (record) => ({
        // Estilo condicional basado en el stock
        style: {
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
              ? '#f54242' // Rojo si el stock es menor o igual a 20
              : '#FCFB77', // Amarillo si el stock está entre 21 y 49
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto
          padding: "10px", // Espaciado interno
        }
      }),
    },
    {
      title: "Ver más", // Título de la columna
      dataIndex: "tienda_id", // Campo para identificar la tienda
      key: "verMas", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      render: (text, record) => (
        <Button 
          type="primary" 
          style={{ width: "55px" }} 
          block
          onClick={() => {
            setIdT(text); // Establecer el ID de la tienda seleccionada
            setOpenTiendaDetalleProducto(true); // Abrir el modal
          }}
        >
          +
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Tabla que muestra los datos de las tiendas y stock */}
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Definir las columnas de la tabla
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} // Asignar datos a la tabla y añadir una clave única
      />
      
      {/* Modal para ver detalles de la tienda seleccionada */}
      <ProductoDetalleModal
        openModal={OpenTiendaDetalleProducto} // Estado para controlar la visibilidad del modal
        closeModal={setOpenTiendaDetalleProducto} // Función para cerrar el modal
        id={idT} // ID de la tienda seleccionada
        idp={id} // Pasar el ID del producto como prop
      />
    </>
  );
}

export default ProductoTiendasTable; // Exportar el componente

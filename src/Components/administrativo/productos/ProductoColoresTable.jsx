import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getColoresByProducto } from "@AA/Color"; // Función para obtener colores por producto
import { Table, Button } from "antd"; // Importa los componentes de Ant Design

import TallaDetalleModal from "@CA/productos/TallaDetalleModal"; // Modal para ver detalles de talla

const ProductoColoresTable = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [detalle_ID, setdetalle_ID] = useState(0); // Estado para el ID del detalle del producto
  const [OpenTallaDetalleModal, setOpenTallaDetalleModal] = useState(false); // Controla la visibilidad del modal
  const [data, setData] = useState([]); // Estado para almacenar los datos de colores

  // Efecto para obtener los colores cuando el ID del producto cambia
  useEffect(() => {
    getColoresByProducto(id, setData); // Llama a la función para obtener colores por producto
  }, [id]); // Ejecuta el efecto cada vez que cambie el `id`

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: "Color", // Título de la columna
      dataIndex: "color_nombre", // Indica que el nombre del color se encuentra en `color_nombre`
      key: "color_nombre", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
    },
    {
      title: "Stock", // Título de la columna
      dataIndex: "stock", // Indica que la cantidad de stock se encuentra en `stock`
      key: "stock", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      sorter: {
        compare: (a, b) => a.stock - b.stock, // Permite ordenar la columna por stock
        multiple: 2, // Define que esta columna puede ser ordenada por `stock`
      },
      // Personaliza el estilo de las celdas según el valor del stock
      onCell: (record) => ({
        style: {
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
            ? '#f54242' // Rojo si el stock es menor o igual a 20
            : '#FCFB77', // Amarillo si el stock está entre 20 y 50
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Cambia el color del texto
          padding: "10px", // Añade espacio dentro de las celdas
        }
      }),
    },
    {
      title: "Ver más", // Título de la columna
      key: "verMas", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      render: (text, record) => { // Renderiza un botón "Ver más"
        return (
          <Button 
            type="primary" 
            style={{ width: "55px" }} 
            block 
            onClick={() => { 
              setdetalle_ID(record.productoDetalle_id); // Establece el ID del detalle del producto
              setOpenTallaDetalleModal(true); // Abre el modal de detalle
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
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Asocia las columnas a la tabla
        dataSource={data} // Asocia los datos obtenidos a la tabla
      />
      
      {/* Modal de detalle de talla */}
      <TallaDetalleModal
        openModal={OpenTallaDetalleModal} // Controla la visibilidad del modal
        closeModal={() => setOpenTallaDetalleModal(false)} // Cierra el modal
        idD={detalle_ID} // Pasa el ID del detalle al modal
      />
    </>
  );
};

export default ProductoColoresTable;

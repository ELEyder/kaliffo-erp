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

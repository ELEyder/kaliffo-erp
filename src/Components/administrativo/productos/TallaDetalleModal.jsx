import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { getTallasColoresProductos } from "@AA/Producto"; // Importar función para obtener tallas y colores de productos

const TallaDetalleModal = ({ openModal, closeModal, idD }) => {
  const [tallaDetalle, setTallaDetalle] = useState([]); // Estado para almacenar los detalles de tallas y colores

  // Obtener los detalles de tallas y colores cada vez que el ID del producto cambie
  useEffect(() => {
    getTallasColoresProductos(idD, setTallaDetalle); // Obtener los datos basados en el ID del producto
  }, [idD]);

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: "Talla", // Título de la columna
      key: "talla", // Clave única para la columna
      dataIndex: "talla", // Campo de datos a mostrar
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Stock", // Título de la columna
      key: "cantidad", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      dataIndex: "cantidad", // Campo de datos a mostrar
      defaultSortOrder: "ascend", // Orden por defecto al cargar la tabla
      onCell: (record) => ({
        // Estilo condicional basado en la cantidad
        style: {
          background: record.cantidad >= 50 
            ? 'green' // Verde si la cantidad es mayor o igual a 50
            : record.cantidad <= 20 
              ? '#f54242' // Rojo si la cantidad es menor o igual a 20
              : '#FCFB77', // Amarillo si la cantidad está entre 21 y 49
          color: record.cantidad <= 20 || record.cantidad >= 50 ? "white" : "black", // Ajustar el color del texto
          padding: "10px", // Espaciado interno
        }
      }),
    }
  ];

  return (
    <Modal
      forceRender
      getContainer={false}
      title={"Tallas"} // Título del modal
      open={openModal} // Controlar visibilidad del modal con openModal
      onCancel={() => closeModal()} // Cerrar el modal cuando el usuario hace clic en cancelar
      style={{ textTransform: "uppercase" }} // Transformar el texto del título a mayúsculas
      footer={<Button onClick={() => closeModal(false)}>Cerrar</Button>} // Botón para cerrar el modal
      centered={true} // Centrar el modal en la pantalla
      width={500} // Establecer el ancho del modal
    >
      {/* Tabla para mostrar los detalles de tallas y stock */}
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Pasar las columnas a la tabla
        pagination={{ pageSize: 4 }} // Paginación con 4 elementos por página
        bordered
        dataSource={tallaDetalle} // Usar tallaDetalle como fuente de datos para la tabla
        rowKey={(record) => record.talla} // Establecer la clave de cada fila a la talla
      />
    </Modal>
  );
};

export default TallaDetalleModal; // Exportar el componente

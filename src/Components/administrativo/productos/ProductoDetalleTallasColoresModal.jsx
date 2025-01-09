import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Flex, Popconfirm } from "antd"; // Importa componentes de Ant Design

import { getTallasColoresProductos } from "@AA/Producto"; // Función para obtener las tallas y colores de productos

const ProductoDetalleTallasColoresModal = ({
  openModal, // Controla si el modal está abierto
  closeModal, // Función para cerrar el modal
  id, // ID del producto
  talla, // Talla seleccionada
}) => {
  const [productoTallasColores, setproductoTallasColores] = useState([]); // Estado para almacenar las tallas y colores del producto

  // Efecto para obtener las tallas y colores cuando la talla cambia
  useEffect(() => {
    if (talla) {
      getTallasColoresProductos(id, talla, setproductoTallasColores); // Obtiene los detalles de las tallas y colores
    }
  }, [talla]); // Dependencia del efecto: se ejecuta cuando `talla` cambia

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: "Color", // Título de la columna
      key: "nombre", // Llave única para la columna
      dataIndex: "nombre", // Indica que el nombre del color está en `nombre`
      align: "center", // Alinea el contenido al centro
      render: (text, record) => {
        return <>{record.nombre}</>; // Muestra el nombre del color
      },
    },
    {
      title: "Stock", // Título de la columna
      key: "stock", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      dataIndex: "stock", // Indica que el stock está en `stock`
      defaultSortOrder: "ascend", // Orden predeterminado de la columna (ascendente)
      onCell: (record) => ({
        style: {
          background:
            record.stock >= 50
              ? "green" // Verde si el stock es mayor o igual a 50
              : record.stock <= 20
              ? "#f54242" // Rojo si el stock es menor o igual a 20
              : "#FCFB77", // Amarillo si el stock está entre 20 y 50
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajusta el color del texto
          padding: "10px", // Añade espacio dentro de las celdas
        },
      }),
    },
  ];

  return (
    <>
      {/* Modal que muestra los colores y stock de la talla seleccionada */}
      <Modal
        forceRender
        getContainer={false}
        styles={{ header: { textAlign: "center" } }} // Estilo personalizado para el encabezado
        title={"COLORES"} // Título del modal
        open={openModal} // Controla si el modal está visible
        onCancel={() => {
          closeModal(false); // Cierra el modal
        }}
        centered={true} // Centra el modal en la pantalla
        width={500} // Ancho del modal
        footer={<Button onClick={() => closeModal(false)}>Cerrar</Button>} // Botón de cierre
      >
        <Table
          columns={columns} // Asocia las columnas a la tabla
          pagination={{ pageSize: 4 }} // Define el tamaño de las páginas en la tabla
          bordered // Añade borde a la tabla
          dataSource={productoTallasColores} // Establece los datos de la tabla
          rowKey={(record) => record.color_id} // Define la clave única para cada fila
        />
      </Modal>
    </>
  );
};

export default ProductoDetalleTallasColoresModal;

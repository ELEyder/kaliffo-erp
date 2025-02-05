import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Flex, Popconfirm } from "antd"; // Importa componentes de Ant Design

import { getColoresDetalleProducto } from "@AA/Producto"; // Función para obtener detalles de colores del producto
import TallaDetalleModal from "@CA/productos/TallaDetalleModal"; // Modal para mostrar detalles de talla

const ProductoDetalleModal = ({
  openModal, // Controla si el modal está abierto
  closeModal, // Función para cerrar el modal
  tipo,
  id, // ID del producto
  idp, // ID de otro parámetro relacionado con el producto
}) => {

  // Estados para controlar la visibilidad del modal de detalles y la información de producto
  const [OpenTallaDetalleModal, setOpenTallaDetalleModal] = useState(false);
  const [detalle_ID, setdetalle_ID] = useState(0);
  const [productoDetalle, setproductoDetalle] = useState([]); // Almacena los detalles del producto

  // Efecto para obtener los detalles de los colores cuando el `idp` cambia
  useEffect(() => {
    if (idp) {
      getColoresDetalleProducto(tipo,id, idp, setproductoDetalle); // Obtiene los detalles de los colores
    }
  }, [idp]); // Dependencia del efecto: se ejecuta cuando `idp` cambia

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: "Color", // Título de la columna
      key: "color_nombre", // Llave única para la columna
      dataIndex: "color_nombre", // Indica que los colores están en `color_nombre`
      align: "center", // Alinea el contenido al centro
      render: (text, record) => {
        return (
          <>
            {record.color_nombre} 
          </>
        );
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
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
              ? '#f54242' // Rojo si el stock es menor o igual a 20
              : '#FCFB77',  // Amarillo si el stock está entre 20 y 50
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajusta el color del texto
          padding: "10px", // Añade espacio dentro de las celdas
        }
      })
    },
    {
      title: "Ver más", // Título de la columna
      key: "x", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      render: (text, record) => {
        return (
          <Button onClick={() => {
            setdetalle_ID(record.productoDetalle_id); // Establece el ID del detalle seleccionado
            setOpenTallaDetalleModal(true); // Abre el modal de detalles
          }}>
            + 
          </Button>
        );
      },
    }
  ];

  return (
    <>
      {/* Modal principal que muestra la lista de colores */}
      <Modal
        forceRender
        getContainer={false}
        styles={{ header: { textAlign: "center" } }} // Estilo personalizado para el encabezado
        title={"COLORES"} // Título del modal
        open={openModal} // Controla si el modal está visible
        onCancel={() => {
          closeModal(false); // Cierra el modal
        }}
        style={{ textTransform: "uppercase" }} // Estilo para el texto del modal
        centered={true} // Centra el modal en la pantalla
        width={500} // Ancho del modal
        footer={<Button onClick={() => closeModal(false)}>Cerrar</Button>} // Botón de cierre
      >
        <Table
          scroll={{ x: 'min-content' }}
          columns={columns} // Asocia las columnas a la tabla
          pagination={{ pageSize: 4 }} // Define el tamaño de las páginas en la tabla
          bordered // Añade borde a la tabla
          dataSource={productoDetalle} // Establece los datos de la tabla
          rowKey={(record) => record.productoDetalle_id} // Define la clave única para cada fila
        />
      </Modal>

      {/* Modal de detalle de talla */}
      <TallaDetalleModal
        openModal={OpenTallaDetalleModal} // Controla la visibilidad del modal
        closeModal={() => setOpenTallaDetalleModal(false)} // Cierra el modal
        idD={detalle_ID} // Pasa el ID del detalle al modal
      />
    </>
  );
};

export default ProductoDetalleModal;

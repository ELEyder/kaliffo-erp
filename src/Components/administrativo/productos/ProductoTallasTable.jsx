import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getTallasByProducto } from "@AA/Talla"; // Importar función para obtener tallas por producto
import ProductoDetalleTallasColoresModal from "@CA/productos/ProductoDetalleTallasColoresModal"; // Modal para detalles de tallas y colores

const ProductoTallasTable = () => {
  // Obtener el ID del producto desde los parámetros de la URL
  const { id } = useParams();
  
  const [tabla, setTabla] = useState([]); // Estado para los datos de la tabla
  const [OpenProductoDetalleTallasColoresModal, setOpenProductoDetalleTallasColoresModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [talla, setTalla] = useState(""); // Estado para la talla seleccionada

  // Efecto que se ejecuta cuando el ID del producto cambia
  useEffect(() => {
    getTallasByProducto(id, setTabla); // Obtener los datos de tallas y cantidades
  }, [id]);

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: "Talla", // Título de la columna
      dataIndex: "talla", // Campo de datos a mostrar
      key: "talla", // Clave única para la columna
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Cantidad", // Título de la columna
      dataIndex: "cantidad", // Campo de datos a mostrar
      key: "cantidad", // Clave única para la columna
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
      key: "verMas", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      render: (text, record) => (
        <Button 
          type="primary" 
          style={{ width: "55px" }} 
          block
          onClick={() => {
            setTalla(record.talla); // Establecer la talla seleccionada
            setOpenProductoDetalleTallasColoresModal(true); // Abrir el modal
          }}
        >
          +
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Tabla que muestra los datos de las tallas y cantidades */}
      <Table
        columns={columns} // Definir las columnas de la tabla
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} // Asignar datos a la tabla y añadir una clave única
      />
      
      {/* Modal para ver detalles de la talla y colores */}
      <ProductoDetalleTallasColoresModal 
        openModal={OpenProductoDetalleTallasColoresModal} // Estado para controlar la visibilidad del modal
        closeModal={setOpenProductoDetalleTallasColoresModal} // Función para cerrar el modal
        id={id} // ID del producto
        talla={talla} // Talla seleccionada
      />
    </>
  );
}

export default ProductoTallasTable; // Exportar el componente

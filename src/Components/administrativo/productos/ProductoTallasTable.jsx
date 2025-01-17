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
  
  return (
    <>
      {/* Tabla que muestra los datos de las tallas y cantidades */}
      <Table
        scroll={{ x: 'min-content' }}
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

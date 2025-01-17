import React, { useEffect, useState } from "react"; // Importaciones de React
import { useParams } from 'react-router-dom'; // Hooks de React Router para los parámetros de la URL
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto
import { getProductosByTienda } from "@AA/Producto"; // Función API para obtener los productos de una tienda específica
import { Button, Table } from "antd"; // Componentes de Ant Design

const ProductosTable = () => {
  const { id } = useParams(); // Extraer el ID de la tienda desde los parámetros de la URL

  const [productostienda, setproductostienda] = useState([]); // Estado para almacenar los productos de la tienda
  const [reload, setReload] = useState(false); // Estado para disparar la recarga de datos
  const [OpenTiendaDetalleProducto, setOpenTiendaDetalleProducto] = useState(false); // Estado para controlar la visibilidad del modal de detalles del producto
  const [idp, setIdP] = useState(0); // Estado para almacenar el ID del producto seleccionado para el modal
  const [nombreProducto, setNombreProducto] = useState(''); // Estado para almacenar el nombre del producto seleccionado para el modal

  // Obtener los productos de la tienda cuando el componente se monta o cuando cambia el estado de recarga
  useEffect(() => {
    getProductosByTienda(id, setproductostienda); // Obtener los productos de la tienda según el ID
  }, [id, reload]); // Las dependencias incluyen el ID de la tienda y el estado de recarga

  

  return (
    <>
      {/* Tabla que muestra la lista de productos para la tienda seleccionada */}
      <Table 
        scroll={{ x: 'min-content' }}
        columns={columns} // Pasar la definición de columnas
        pagination={{ pageSize: 5 }} // Establecer paginación con 5 elementos por página
        bordered // Añadir borde a la tabla
        dataSource={productostienda.map((item, index) => ({ ...item, key: index }))} // Mapear los datos con claves únicas
        rowKey={(record) => record.producto_id} // Definir la clave única de cada fila
      />

      {/* Modal para mostrar los detalles del producto */}
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

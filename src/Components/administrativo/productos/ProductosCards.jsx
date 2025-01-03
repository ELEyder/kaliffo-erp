import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // Para crear enlaces de navegación
import { Card, Flex, FloatButton, Popconfirm, Tooltip, Image } from "antd"; // Componentes de Ant Design
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'; // Iconos de Ant Design

import { getProductos } from "@AA/Producto"; // Función para obtener productos
import AddProductoModal from "@CA/productos/AddProductoModal"; // Modal para añadir un producto
import DeleteProductoModal from "@CA/productos/DeleteProductoModal"; // Modal para eliminar un producto
import UpdateProductoModal from "@CA/productos/UpdateProductoModal"; // Modal para actualizar un producto

const { Meta } = Card; // Meta es un componente de Card que muestra información adicional

const ProductosCards = () => {
  const [id, setId] = useState(0); // Estado para almacenar el ID del producto seleccionado
  const [productos, setTiendas] = useState([]); // Estado para almacenar la lista de productos
  const [OpenAddProductoModal, setOpenAddProductoModal] = useState(false); // Estado para controlar el modal de añadir producto
  const [OpenUpdateProducto, setOpenUpdateProducto] = useState(false); // Estado para controlar el modal de actualizar producto
  const [OpenDeleteProducto, setOpenDeleteProducto] = useState(false); // Estado para controlar el modal de eliminar producto
  const [reload, setReload] = useState(false); // Estado para forzar la recarga de los productos

  // Efecto para obtener los productos al cargar o cuando se recarga la lista
  useEffect(() => {
    getProductos(setTiendas); // Obtiene la lista de productos y actualiza el estado
  }, [reload]); // El efecto se ejecuta cuando cambia el estado de `reload`

  return (
    <>
      <Flex wrap gap={"middle"} justify="space-evenly" gutter={20}>
        {productos.map((producto, index) => {
          return (
              <Card
                key={index}
                style={{ width: "300px", overflow: 'hidden' }} // Estilo de la tarjeta
                title={producto.nombre} // Título de la tarjeta con el nombre del producto
                actions={[ // Acciones de la tarjeta (editar, ver detalles, eliminar)
                  <Tooltip title="Editar Producto" className={"card-update"} onClick={(e) => {
                    setId(producto.producto_id); // Establece el ID del producto
                    setOpenUpdateProducto(true); // Abre el modal de actualización
                  }}>
                    <EditOutlined key="edit" color="white" />
                  </Tooltip>,
                  <Tooltip title="Ver Detalles" className={"card-view"}>
                    <Link to={`/admin/productos/${producto.producto_id}`}>
                      <EyeOutlined style={{ color: "white" }} key="view" />
                    </Link>
                  </Tooltip>,
                  <Popconfirm
                    title="ELIMINAR"
                    description="¿DESEA ELIMINAR ESTE PRODUCTO?"
                    okText="Confirmar"
                    onConfirm={(e) => {
                      e.stopPropagation(); // Evita que se ejecute el click en el Card
                      setId(producto.producto_id); // Establece el ID del producto
                      setOpenDeleteProducto(true); // Abre el modal de eliminación
                    }} 
                    cancelText="NO"
                  >
                    <Tooltip title="Eliminar Producto" className={"card-delete"}>
                      <DeleteOutlined key="delete" style={{ color: "white" }} />
                    </Tooltip>
                  </Popconfirm>
                ]}
                cover={ // Imagen del producto
                  <Image
                    width={"100%"}
                    height={'auto'}
                    src={`/img/productos/${producto.producto_id}.png`}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANS...Q==" // Imagen por defecto si no se encuentra la imagen
                  />
                }
              >
                <Meta
                  style={{ textAlign: "center", fontSize: "20px" }}
                  title={`Precio: S/${producto.precioBase}`} // Precio del producto
                />
                <Meta
                  style={{ textAlign: "center", fontWeight: "bold" }}
                  title={`Stock general: ${producto.stockTotal}`} // Stock total del producto
                />
              </Card>
          );
        })}
      </Flex>

      {/* Botón flotante para añadir un producto */}
      <FloatButton tooltip="Añadir Producto" onClick={() => setOpenAddProductoModal(true)} />

      {/* Modales para añadir, actualizar y eliminar productos */}
      <AddProductoModal
        openModal={OpenAddProductoModal}
        closeModal={() => setOpenAddProductoModal(false)} // Cierra el modal de añadir producto
        reload={() => setReload(!reload)} // Recarga la lista de productos
      />
      <UpdateProductoModal
        openModal={OpenUpdateProducto}
        closeModal={() => setOpenUpdateProducto(false)} // Cierra el modal de actualizar producto
        id={id} // Pasa el ID del producto a actualizar
        reload={() => setReload(!reload)} // Recarga la lista de productos
      />
      <DeleteProductoModal
        openModal={OpenDeleteProducto}
        closeModal={() => setOpenDeleteProducto(false)} // Cierra el modal de eliminar producto
        id={id} // Pasa el ID del producto a eliminar
        reload={() => setReload(!reload)} // Recarga la lista de productos
      />
    </>
  );
};

export default ProductosCards;

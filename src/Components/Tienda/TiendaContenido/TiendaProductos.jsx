import { Button, Flex, Table, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { getProductosTienda } from "../../../Shared/Funciones/Fucniones_Tienda";
import TiendaAddProductos from "../TiendaModales/TiendaAddProductos";
import TiendaDetalleProducto from "../TiendaModales/TiendaDetalleProducto";

const TiendaProductos = ({ id, handlerefrescarSideCard1 }) => {
  const [productosTienda, setProductosTienda] = useState([]);
  const [idP, setIdP] = useState(null);
  const [modalProductoAddTiendaAbierto, setModalProductoAddTiendaAbierto] = useState(false);
  const [modalTiendaDetalleProducto, setModalTiendaDetalleProducto] = useState(false);

  const toggleModalProductoAdd = () => {
    setModalProductoAddTiendaAbierto((prev) => !prev);
  };

  const showModalTiendaDetalleProducto = (idP) => {
    setIdP(idP);
    setModalTiendaDetalleProducto(true);
  };

  const closeModalTiendaDetalleProducto = () => {
    setIdP(null);
    setModalTiendaDetalleProducto(false);
  };

  useEffect(() => {
    getProductosTienda(id, setProductosTienda);
  }, [id]);

  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      defaultSortOrder: "ascend",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      align: "center",
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "descuento",
      align: "center",
    },
    {
      title: "Ver más",
      key: "verMas",
      align: "center",
      render: (_, record) => (
        <Button type="primary" block onClick={() => showModalTiendaDetalleProducto(record.producto_id)}>+</Button>
      ),
    },
    {
      title: "Opciones",
      key: "opciones",
      align: "center",
      render: (_, record) => (
        <Flex gap="small" align="center" horizontal="true" style={{ width: "100%" }} className="opciones-botones">
          <Button type="primary" block>Editar</Button>
          <Popconfirm
            title="ELIMINAR"
            description="¿DESEA ELIMINAR A?"
            okText="Confirmar"
            cancelText="NO"
          >
            <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Button onClick={toggleModalProductoAdd}>Añadir Nuevo Producto</Button>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={productosTienda}
        rowKey="producto_id"
      />
      <TiendaAddProductos
        ModalProductoAddTiendaAbierto={modalProductoAddTiendaAbierto}
        closeModalProductoAddTiendaAbierto={toggleModalProductoAdd}
        id={id}
      />
      <TiendaDetalleProducto
        ModalTiendaDetalleProducto={modalTiendaDetalleProducto}
        closeModalTiendaDetalleProducto={closeModalTiendaDetalleProducto}
        id={id}
        idp={idP}
      />
    </>
  );
};

export default TiendaProductos;

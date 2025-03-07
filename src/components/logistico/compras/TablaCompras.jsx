import React, { useEffect, useState } from "react";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import { eliminarCompra, getCompras } from '@AL/Compras'; // Importa las funciones para obtener compras y eliminar compras
import AddCompraModal from "@CL/compras/AddCompraModal"; // Modal para añadir compras
import DetallesComprasModal from "@CL/compras/DetallesComprasModal"; // Modal para ver detalles de compras
import EditCompraModal from "@CL/compras/EditCompraModal"; // Modal para editar compras

const TablaCompras = () => {
  const [tabla_datos, SetTabla_datos] = useState([]); // Estado para almacenar los datos de las compras
  const [idCompra, setIdCompra] = useState(null); // Estado para almacenar el ID de la compra seleccionada
  const [openDetalleCompras, setopenDetalleCompras] = useState(false); // Estado para controlar la visibilidad del modal de detalles
  const [openEditarCompra, setopenEditarCompra] = useState(false); // Estado para controlar la visibilidad del modal de edición
  const [openAddCompra, setopenAddCompra] = useState(false); // Estado para controlar la visibilidad del modal de añadir compra
  const [reload, setReload] = useState(false); // Estado para forzar la recarga de datos

  const columnas = [
    {
      title: "Tienda",
      key: "tienda",
      dataIndex: "tienda",
      align: "center",
    },
    {
      title: "Empresa Provedora",
      key: "empresa_proveedor",
      dataIndex: "empresa_proveedor",
      align: "center",
    },
    {
      title: "Fecha Compra",
      dataIndex: "fecha_compra",
      key: "fecha_compra",
      align: "center",
      responsive: ["sm"], // Hace que esta columna sea visible solo en tamaños de pantalla pequeños
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
    },
    {
      title: "Total Neto",
      dataIndex: "total",
      key: "total",
      defaultSortOrder: "ascend", // Orden por defecto ascendente
      sorter: {
        compare: (a, b) => a.total.localeCompare(b.total), // Función para ordenar por total neto
        multiple: 2,
      },
      align: "center",
    },
    {
      title:"Detalle", // Columna para ver detalles de la compra
      dataIndex:"",
      key:"f",
      align:"center",
      render:(record) => { // Renderiza un botón para ver los detalles de la compra
        return(
          <Button type="primary"
          onClick={(e) => {
            e.stopPropagation(); // Evita que se dispare el evento en otras filas
            setIdCompra(record.compra_id); // Establece el ID de la compra seleccionada
            setopenDetalleCompras(true); // Abre el modal de detalles
          }}>+</Button>
        );
      }
    },
    {
      title: "Opciones", // Columna de opciones para editar o eliminar
      dataIndex: "",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIdCompra(record.compra_id); // Establece el ID de la compra seleccionada
                  setopenEditarCompra(true); // Abre el modal de edición
                }}
                block
              >
                Editar
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="¿DESEA ELIMINAR ESTA COMPRA?"
                okText="Confirmar"
                onConfirm={(e) => {
                  e.stopPropagation(); // Evita que se dispare el evento en otras filas
                  eliminarCompra(record.compra_id); // Elimina la compra seleccionada
                  setReload(!reload); // Fuerza la recarga de los datos
                }}
                cancelText="NO"
              >
                <Button
                  block
                  style={{ background: "#f54242", color: "white" }}
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    setReload(!reload); // Fuerza la recarga de los datos
                  }}
                >
                  Eliminar
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  // Obtiene las compras al cargar el componente o cuando se recargan los datos
  useEffect(() => {
    getCompras(SetTabla_datos); // Llama a la API para obtener los datos de las compras
  }, [reload]);

  return (
    <>
      {/* Botón flotante para añadir una nueva compra */}
      <FloatButton
        tooltip="Añadir Nuevo"
        onClick={() => setopenAddCompra(true)} // Abre el modal para añadir una nueva compra
      />

      {/* Tabla de compras */}
      <Table
        scroll={{ x: 'min-content' }}
        columns={columnas} // Las columnas definidas previamente
        pagination={{ pageSize: 5 }} // Paginación para la tabla
        dataSource={tabla_datos.map((item, index) => ({
          ...item,
          key: item.compra_id, // Asigna una clave única para cada fila
        }))}
        rowKey={(record) => record.compra_id} // Utiliza el ID de la compra como clave
        bordered
        className="tabla_trabajadores" // Estilo de la tabla
      />

      {/* Modal para añadir una nueva compra */}
      <AddCompraModal
        openModal={openAddCompra} // Controla la visibilidad del modal
        closeModal={setopenAddCompra} // Función para cerrar el modal
        reload={reload} // Pasa el estado de recarga de los datos
        setReload={setReload} // Función para actualizar el estado de recarga
      />

      {/* Modal para ver los detalles de una compra */}
      <DetallesComprasModal 
        openModal={openDetalleCompras}
        closeModal={setopenDetalleCompras}
        reload={() => setReload(!reload)} // Recarga los datos al cerrar el modal
        idC={idCompra} // Pasa el ID de la compra para obtener los detalles
      />

      {/* Modal para editar una compra */}
      <EditCompraModal 
        openModal={openEditarCompra}
        closeModal={setopenEditarCompra}
        reload={() => setReload(!reload)} // Recarga los datos al cerrar el modal
        idC={idCompra} // Pasa el ID de la compra para editarla
      />
    </>
  );
};

export default TablaCompras;

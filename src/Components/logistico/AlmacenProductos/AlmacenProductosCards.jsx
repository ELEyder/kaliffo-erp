import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas
import { Card, Flex, FloatButton, Popconfirm, Tooltip, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getAlmacenProductos } from "@AL/AlmacenProductos"; // Función para obtener los productos del almacén
import AddAlmacenProductosModals from "@CL/AlmacenProductos/AddAlmacenProductosModals"; // Modal para añadir un nuevo almacén

const { Meta } = Card;

const AlmacenProductosCards = () => {
  const navigate = useNavigate(); // Hook de navegación
  const [id, setId] = useState(0); // Estado para el ID del almacén seleccionado
  const [Almacenes, setAlmacenes] = useState([]); // Estado para almacenar los datos de los almacenes
  const [OpenAddAlmacenModal, setOpenAddAlmacenModal] = useState(false); // Estado para controlar la apertura del modal de añadir almacén
  const [OpenUpdateAlmacen, setOpenUpdateAlmacen] = useState(false); // Estado para controlar la apertura del modal de editar almacén
  const [OpenDeleteAlmacen, setOpenDeleteAlmacen] = useState(false); // Estado para controlar la apertura del modal de eliminar almacén
  const [reload, setReload] = useState(false); // Estado para forzar la recarga de los datos de almacenes

  useEffect(() => {
    getAlmacenProductos(setAlmacenes); // Llama a la función para obtener los almacenes y actualiza el estado
  }, [reload]); // La dependencia es `reload`, se recarga cuando cambia

  return (
    <>
      {/* Muestra los almacenes en tarjetas */}
      <Flex wrap gap={"middle"} justify="space-evenly">
        {Almacenes.map((almacen, index) => {
          return (
            <Card
              hoverable
              onClick={() => navigate(`/logistico/almacen_productos/${almacen.almacen_id}`)}
              key={almacen.almacen_id} // Clave única para cada tarjeta
              style={{
                width: "300px",
                overflow: "hidden",
                textAlign: "center",
              }} // Estilo para las tarjetas
              styles={{
                header: { textAlign: "center", textTransform: "uppercase" },
              }}
              title={almacen.nombre_almacen} // Título de la tarjeta (nombre del almacén)
              actions={[
                // Acciones para editar, ver y eliminar almacén
                <Tooltip
                  title="Editar Almacen"
                  className={"card-update"}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se active el evento de la tarjeta
                    setId(almacen.almacen_id); // Establece el ID del almacén seleccionado
                    setOpenUpdateAlmacen(true); // Abre el modal de edición
                  }}
                >
                  <EditOutlined key="edit" color="white" />
                </Tooltip>,
                // <Tooltip title="Ver Detalles" className={"card-view"}>
                //   {/* Aquí se podría agregar un enlace para ver los detalles */}
                // </Tooltip>,
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  placement="bottom"
                  okText="Confirmar"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    setId(almacen.almacen_id); // Establece el ID para eliminar
                    setOpenDeleteAlmacen(true); // Abre el modal de eliminación
                  }}
                  cancelText="NO"
                >
                  <Tooltip title="Eliminar Almacen" className={"card-delete"}>
                    <DeleteOutlined key="delete" style={{ color: "white" }} />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              <Meta
                style={{ textAlign: "left" }}
                title={`Stock general: ${almacen.stock_total}`} // Muestra el stock total en el meta de la tarjeta
              />
            </Card>
          );
        })}
      </Flex>

      {/* Botón flotante para agregar un nuevo almacén */}
      <FloatButton
        tooltip="Añadir Almacen"
        onClick={() => setOpenAddAlmacenModal(true)}
      />

      {/* Modal para añadir un nuevo almacén */}
      <AddAlmacenProductosModals
        openModal={OpenAddAlmacenModal}
        closeModal={() => setOpenAddAlmacenModal(false)} // Cierra el modal
        reload={() => setReload(!reload)} // Recarga los datos
      />
    </>
  );
};

export default AlmacenProductosCards;

import React, { useEffect, useState } from "react";
import { Table, FloatButton } from "antd";
import { useParams } from "react-router-dom";
import { getLavanderia } from "@AP/Lavanderia"; // Función para obtener los datos de lavandería
import AddLavanderiaModal from "@CP/lotes/AddLavanderiaModal"; // Modal para agregar lavandería

const Lavanderia = ({ status, reload, setReload }) => {
  const { id } = useParams(); // Obtener el ID desde los parámetros de la URL
  const [data, setData] = useState([]); // Estado para almacenar los datos de lavandería
  const [openAddModal, setOpenAddModal] = useState(false); // Controlar si el modal está abierto

  // Obtener los datos de lavandería al cargar el componente o cuando cambia el ID o el reload
  useEffect(() => {
    getLavanderia(id, setData);
  }, [id, reload]);

  // Verificar si hay algún corte con estado 1
  const hasOptions = data.some((record) => record.estado === 1);

  // Definir las columnas de la tabla
  const columns = [
    {
      key: "lavanderia_asignada",
      dataIndex: "lavanderia_asignada",
      title: "Lavanderia",
      align: "center",
    },
    {
      key: "producto",
      dataIndex: "producto_nombre",
      title: "Producto",
      align: "center",
    },
    { key: "color", dataIndex: "nombre", title: "Color", align: "center" },
    { key: "talla", dataIndex: "talla", title: "Talla", align: "center" },
    {
      key: "cantidad",
      dataIndex: "cantidad_enviada",
      title: "Cantidad",
      align: "center",
      sorter: (a, b) => a.cantidad_enviada - b.cantidad_enviada, // Permite ordenar por cantidad
    },
    ...(data.some((record)=>record.estado===3)?[{ key: "cantidad_recibida", dataIndex: "cantidad_recibida", title: "Cantidad Recibida", align: "center" }]:[]),
    {
      key: "fecha_envio",
      dataIndex: "fecha_envio",
      title: "Fecha de Envio",
      align: "center",
    },
  ];

  return (
    <>
      {/* Tabla que muestra los datos de lavandería */}
      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      {hasOptions? (
        <>
          {/* Botón flotante para abrir el modal de agregar lavandería */}
          <FloatButton
            style={{ insetInlineStart: 270 }}
            onClick={() => setOpenAddModal(true)} // Abre el modal al hacer clic
            tooltip="Añadir Corte"
          />
          {/* Modal para agregar lavandería */}
          <AddLavanderiaModal
            openModal={openAddModal}
            closeModal={() => setOpenAddModal(false)} // Cierra el modal
            reload={() => setReload(!reload)} // Recarga los datos al agregar un corte
          />
        </>
      ) : null}
    </>
  );
};

export default Lavanderia;

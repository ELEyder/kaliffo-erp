import React, { useEffect, useState } from "react";
import { Table, FloatButton } from "antd";
import { useParams } from "react-router-dom";
import { getLavanderia } from "@AP/Lavanderia";  // Función para obtener los datos de lavandería
import AddLavanderiaModal from "@CP/lotes/AddLavanderiaModal";  // Modal para agregar lavandería

const Lavanderia = ({ status, reload, setReload }) => {
<<<<<<< HEAD
  const { id } = useParams();
  const [cortesT,setcortesT]=useState([]);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
=======
  const { id } = useParams();  // Obtener el ID desde los parámetros de la URL
  const [data, setData] = useState([]);  // Estado para almacenar los datos de lavandería
  const [openAddModal, setOpenAddModal] = useState(false);  // Controlar si el modal está abierto
>>>>>>> 25d544ec5a702f52e8bcbedc1ca428177ff5c456

  // Obtener los datos de lavandería al cargar el componente o cuando cambia el ID o el reload
  useEffect(() => {
    getLavanderia(id, setData);
  }, [id, reload]);

<<<<<<< HEAD
  const estado = data.length>0?data.some((record) => record.estado === 1):true;
=======
  // Definir las columnas de la tabla
  const columns = [
    { key: 'lavanderia_asignada', dataIndex: 'lavanderia_asignada', title: 'Lavanderia', align: "center" },
    { key: 'producto', dataIndex: 'producto_nombre', title: 'Producto', align: "center" },
    { key: 'color', dataIndex: 'nombre', title: 'Color', align: "center" },
    { key: 'talla', dataIndex: 'talla', title: 'Talla', align: "center" },
    { 
      key: 'cantidad', 
      dataIndex: 'cantidad_enviada', 
      title: 'Cantidad', 
      align: "center", 
      sorter: (a, b) => a.cantidad_enviada - b.cantidad_enviada  // Permite ordenar por cantidad
    },
    { key: 'fecha_envio', dataIndex: 'fecha_envio', title: 'Fecha de Envio', align: "center" },
  ];
>>>>>>> 25d544ec5a702f52e8bcbedc1ca428177ff5c456

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
      align: "center",
      title: "Cantidad",
      sorter: (a, b) => a.cantidad_enviada - b.cantidad_enviada,
    },
    { key: "talla", dataIndex: "talla", title: "Talla", align: "center" },
    {
      key: "fecha_envio",
      dataIndex: "fecha_envio",
      title: "Fecha de Envio",
      align: "center",
    },
  ];
  
  return (
    <>
<<<<<<< HEAD
      <Table dataSource={data} columns={columns} rowKey="corte_id" />
      {estado && cortesT>0 ? (
        <>
          <FloatButton
            style={{ insetInlineStart: 270 }}
            onClick={() => setOpenAddModal(true)}
            tooltip="Añadir Corte"
          />
          <AddLavanderiaModal
            openModal={openAddModal}
            closeModal={() => setOpenAddModal(false)}
            reload={() => setReload(!reload)}
          />
        </>
      ) : null}
=======
      {/* Botón flotante para abrir el modal de agregar lavandería */}
      <FloatButton
        style={{ insetInlineStart: 270 }}
        onClick={() => setOpenAddModal(true)}  // Abre el modal al hacer clic
        tooltip="Añadir Corte"
      />

      {/* Tabla que muestra los datos de lavandería */}
      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      {/* Modal para agregar lavandería */}
      <AddLavanderiaModal
        openModal={openAddModal}
        closeModal={() => setOpenAddModal(false)}  // Cierra el modal
        reload={() => setReload(!reload)}  // Recarga los datos al agregar un corte
      />
>>>>>>> 25d544ec5a702f52e8bcbedc1ca428177ff5c456
    </>
  );
};

export default Lavanderia;

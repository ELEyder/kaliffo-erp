import React, { useState, useEffect } from "react"; // Importar hooks de React para manejar estado y ciclos de vida
import TrabajadorInfoCard from "@CA/trabajadores/TrabajadorInfoCard";
import { useParams } from 'react-router-dom'; // Hook para acceder a los parámetros de la ruta
import PagosTable from "@CA/trabajadores/PagosTable";
import Tabla from "../../../Components/Tabla"
import { Divider, Tabs, Flex, FloatButton } from "antd";
import { FileAddOutlined } from '@ant-design/icons'; // Icono de agregar para el botón flotante
import { getColumnas, getUrl } from "../../../interfaces/Incidencias";
import UpdateIncidenciaModal from "@CA/trabajadores/UpdateIncidenciaModal"; // Componente modal para actualizar incidencias
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal"; // Componente modal para agregar nuevas incidencias

const Trabajador = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [incidencia, setIncidencia] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [modals, setModals] = useState({
    "addI": false,
    "updI": false
  })
  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = getColumnas(changeModal, setIncidencia, ()=>setReload(!reload))

  // Definición de las pestañas que se mostrarán
  const items = [
    {
      key: "Incidencias",
      label: "Incidencias",
      children:
        <Tabla
          columnas={columnas}
          rowKey={"incidencia_id"}
          url={getUrl(id)}
          reload={() => setReload(!reload)}
        />, // Componente que muestra las incidencias
    },
    // { key: "Horario", label: "Horario", children: <HorariosTable /> }, // Componente que muestra los horarios
    { key: "Pagos", label: "Pagos", children: <PagosTable /> }, // Componente que muestra los pagos
  ];

  return (
    <>
      <Divider>Detalles del Usuario</Divider> {/* Título de la sección */}
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px", // Máxima anchura del contenedor
          margin: "0 auto", // Centrado horizontal
          padding: "1rem", // Espaciado interno
        }}
      >
        {/* Tarjeta de información del trabajador */}
        <TrabajadorInfoCard
          style={{
            flex: "1 1 45%",
            minWidth: "400px", // Ancho mínimo
            maxWidth: "700px", // Ancho máximo
          }}
        />
        {/* Pestañas que contienen las tablas de incidencias, horarios y pagos */}
        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
        />
      </Flex>

      <Divider></Divider> {/* Separador al final */}

      <FloatButton tooltip="Añadir Nueva Incidencia" onClick={() => setModalAddIncidenciaOpen(true)} type="primary" icon={<FileAddOutlined />} /> {/* Botón flotante para agregar una nueva incidencia */}

      {/* Modales para editar y agregar incidencias */}
      <UpdateIncidenciaModal
        openModal={modals.updI} // Controlar la visibilidad del modal
        closeModal={() => changeModal("updI", false)} // Función para cerrar el modal
        reload={() => setReload(!reload)} // Pasar el estado de recarga para actualizar los datos
        values={incidencia} // Pasar los datos de la incidencia seleccionada para editar
      />
      <AddIncidenciaModal
        openModal={modals.addI} // Controlar la visibilidad del modal
        closeModal={() => changeModal("addI", false)} // Función para cerrar el modal
        reload={reload} // Pasar el estado de recarga para actualizar los datos
        id={id} // Pasar el ID del trabajador para asociarlo con la nueva incidencia
      />
    </>
  );
};

export default Trabajador;

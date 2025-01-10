import React, { useState, useEffect } from "react"; // Importar hooks de React para manejar estado y ciclos de vida
import { useParams } from 'react-router-dom'; // Hook para acceder a los parámetros de la ruta
import { Table, Button, Popconfirm, FloatButton } from "antd"; // Componentes de Ant Design
import { FileAddOutlined } from '@ant-design/icons'; // Icono de agregar para el botón flotante

import { getIncidenciasByTrabajador, deleteIncidenciaById } from "@AA/Incidencia"; // Importar funciones para obtener y eliminar incidencias
import UpdateIncidenciaModal from "@CA/trabajadores/UpdateIncidenciaModal"; // Componente modal para actualizar incidencias
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal"; // Componente modal para agregar nuevas incidencias

const IncidenciasTable = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const [tabla, setTabla] = useState([]); // Estado para almacenar la lista de incidencias
  const [reload, setReload] = useState(false); // Estado para activar recarga después de acciones como agregar/eliminar
  const [incidencia, setIncidencia] = useState({}); // Estado para almacenar la incidencia seleccionada para editar
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false); // Estado para controlar la visibilidad del modal de edición
  const [ModalAddIncidenciaOpen, setModalAddIncidenciaOpen] = useState(false); // Estado para controlar la visibilidad del modal de agregar

  // Obtener los datos de las incidencias cuando el componente se monta o cambia el estado de recarga
  useEffect(() => {
    getIncidenciasByTrabajador(id, setTabla); // Obtener incidencias del trabajador usando el ID
  }, [id, reload]);

  // Definir las columnas de la tabla
  const columns = [
    { title: "N°", dataIndex: "id", key: "id", align: "center" }, // Número de incidencia (ID)
    {
      title: "Incidencia", // Columna del tipo de incidencia
      dataIndex: "incidencia", 
      key: "incidencia", 
      align: "center",
      onCell: (record) => ({
        style: {
          background: record.incidencia === "Familiar" ? '#FCFB77' : 
                      record.incidencia === "Personal" ? 'orange' : '#f54242', // Color según el tipo de incidencia
          color: record.incidencia === "Salud" ? "white" : "black", // Cambio de color de texto para el tipo "Salud"
          padding: "10px"
        }
      }),
      sorter: {
        compare: (a, b) => a.incidencia.localeCompare(b.incidencia), // Ordenar incidencias por tipo
        multiple: 1,
      }
    },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion", align: "center" }, // Descripción de la incidencia
    { title: "Fecha", dataIndex: "fecha_creacion", key: "fecha_creacion", align: "center" }, // Fecha en que se creó la incidencia
    {
      title: "Opciones", // Columna de opciones para editar y eliminar incidencias
      key: "opciones", 
      align: "center",
      render: (text, record) => { // Renderizado personalizado para los botones de editar y eliminar
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary"
              block
              onClick={() => {
                setIncidencia(record); // Establecer la incidencia seleccionada para editar
                setModalEditarAbierto(true); // Abrir el modal de edición
              }}
            >
              Editar
            </Button>
            <Popconfirm
              title="¿Estás seguro de que deseas eliminar esta incidencia?" // Confirmación para eliminar
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={() => {
                deleteIncidenciaById(record.incidencia_id); // Eliminar la incidencia por su ID
                setReload(!reload); // Activar la recarga después de la eliminación
              }}
            >
              <Button block style={{ background: "#f54242", color: "white" }} danger>
                Eliminar
              </Button>
            </Popconfirm>
          </div>
        );
      }
    },
  ];

  return (
    <>
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Pasar las columnas al componente Table
        dataSource={tabla?.map((item, index) => ({ ...item, key: item.incidencia_id }))} // Establecer los datos para la tabla
        pagination={{ pageSize: 5 }} // Configuración de la paginación (5 elementos por página)
      />
      <FloatButton tooltip="Añadir Nueva Incidencia" onClick={() => setModalAddIncidenciaOpen(true)} type="primary" icon={<FileAddOutlined />} /> {/* Botón flotante para agregar una nueva incidencia */}

      {/* Modales para editar y agregar incidencias */}
      <UpdateIncidenciaModal
        openModal={ModalEditarAbierto} // Controlar la visibilidad del modal
        closeModal={() => setModalEditarAbierto(false)} // Función para cerrar el modal
        reload={reload} // Pasar el estado de recarga para actualizar los datos
        values={incidencia} // Pasar los datos de la incidencia seleccionada para editar
      />
      <AddIncidenciaModal
        openModal={ModalAddIncidenciaOpen} // Controlar la visibilidad del modal
        closeModal={() => setModalAddIncidenciaOpen(false)} // Función para cerrar el modal
        reload={reload} // Pasar el estado de recarga para actualizar los datos
        id={id} // Pasar el ID del trabajador para asociarlo con la nueva incidencia
      />
    </>
  );
};

export default IncidenciasTable; // Exportar el componente

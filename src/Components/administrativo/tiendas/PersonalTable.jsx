import React, { useState, useEffect } from "react"; // Importaciones de React
import { useNavigate, useParams } from 'react-router-dom'; // Hooks de React Router para navegación
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal"; // Modal para actualizar los datos de un trabajador
import AddPersonalModal from "@CA/tiendas/AddPersonalModal"; // Modal para añadir un nuevo trabajador
import { getTrabajadoresTienda, deleteTrabajadorById } from '@AA/Usuario'; // Funciones API para obtener y eliminar trabajadores
import { Table, Button, Row, Col, Popconfirm, FloatButton } from "antd"; // Componentes de Ant Design
import { FileAddOutlined } from "@ant-design/icons"; // Icono para el botón de "Añadir"

const PersonalTable = () => {
  const { id } = useParams(); // Extraer el ID de la tienda de los parámetros de la URL
  const navigate = useNavigate(); // Hook para navegar de manera programática

  const [usuariostienda, setUsuariostienda] = useState([]); // Estado para almacenar los datos de los trabajadores
  const [idPersonal, setIdPersonal] = useState(null); // Estado para almacenar el ID del trabajador seleccionado para editar
  const [reload, setReload] = useState(false); // Estado para disparar la recarga de datos

  const [OpenModalUpdate, setOpenModalUpdate] = useState(false); // Estado para controlar la visibilidad del modal de actualización
  const [OpenaddTrabajadorModal, setOpenaddTrabajadorModal] = useState(false); // Estado para controlar la visibilidad del modal para añadir personal

  useEffect(() => {
    // Obtener los trabajadores de la tienda cuando el componente se monta o cuando el ID de la tienda o el estado de recarga cambian
    getTrabajadoresTienda(id, setUsuariostienda);
  }, [id, reload]);

  // Definición de las columnas para la tabla que muestra los trabajadores
  const columns = [
    {
      title: "Nombre", // Título de la columna para el nombre completo del trabajador
      key: "nombre", 
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`, // Concatenar nombre, apellido paterno y apellido materno
      align: "center", // Alinear el texto al centro
    },
    {
      title: "DNI", // Título de la columna para el DNI del trabajador
      dataIndex: "dni", // Mapear la columna al campo "dni" en los datos
      key: "dni", 
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Teléfono", // Título de la columna para el teléfono del trabajador
      dataIndex: "telefono", // Mapear la columna al campo "telefono" en los datos
      key: "telefono", 
      align: "center", // Alinear el texto al centro
    },
    {
      title:"Ver mas", // Columna para el botón de "Ver más"
      dataIndex: "usuario_id", 
      key:"verMas",
      align:"center",
      render:(text) =>{ 
        return(
          <Button type="primary" block
          onClick={() => {
            // Navegar a la página del trabajador individual cuando se hace clic en el botón
            navigate(`/admin/trabajadores/${text}`)
          }}
          >+</Button>
        )
      }
    },
    {
      title: "Opciones", // Título de la columna para opciones (editar y eliminar)
      dataIndex: "usuario_id", 
      key: "opciones", 
      align: "center", 
      render: (text) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
              {/* Botón de Editar: Abre el modal de actualización para el trabajador seleccionado */}
              <Button type="primary" block onClick={() => {
                setIdPersonal(text); // Establecer el ID del trabajador para editar
                setOpenModalUpdate(true); // Abrir el modal de actualización
              }}>Editar</Button>
            </Col>
            <Col>
              {/* Botón de Eliminar: Muestra la confirmación para eliminar */}
              <Popconfirm
                title="ELIMINAR" // Título de la confirmación
                description="DESEA ELIMINAR A" // Mensaje de confirmación
                okText="Confirmar" // Texto del botón OK
                cancelText="NO" // Texto del botón de cancelar
                onConfirm={() => {
                  deleteTrabajadorById(text); // Eliminar el trabajador por ID
                  setReload(!reload); // Disparar una recarga después de la eliminación
                }}
              >
                <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      {/* Botón flotante para añadir un nuevo trabajador */}
      <FloatButton tooltip="Añadir Nuevo Personal" onClick={() => setOpenaddTrabajadorModal(true)} type="primary" icon={<FileAddOutlined />}/>

      {/* Tabla que muestra la lista de trabajadores */}
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Definición de columnas
        pagination={{ pageSize: 5 }} // Establecer paginación con 5 elementos por página
        bordered // Añadir borde a la tabla
        dataSource={usuariostienda} // Mapear los datos con claves únicas
        rowKey={"trabajador_id"} // Definir la clave única de cada fila
      />

      {/* Modal para actualizar los detalles de un trabajador */}
      <UpdateTrabajadorModal
        openModal={OpenModalUpdate} // Visibilidad del modal
        closeModal={() => setOpenModalUpdate(false)} // Cerrar el modal
        id={idPersonal} // Pasar el ID del trabajador al modal
        reload={() => setReload(!reload)} // Recargar después de actualizar
      />

      {/* Modal para añadir un nuevo trabajador */}
      <AddPersonalModal
        openModal={OpenaddTrabajadorModal} // Visibilidad del modal
        closeModal={() => setOpenaddTrabajadorModal(false)} // Cerrar el modal
        id={id} // Pasar el ID de la tienda al modal
        reload={() => setReload(!reload)} // Recargar después de añadir un nuevo trabajador
      />
    </>
  );
};

export default PersonalTable; // Exportar el componente PersonalTable

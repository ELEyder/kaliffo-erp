import React, { useEffect, useState } from "react"; // Hooks de React
import { Link } from "react-router-dom"; // React Router para navegación
import { Card, Flex, FloatButton, Popconfirm, Tooltip } from "antd"; // Componentes de Ant Design para diseño y acciones
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'; // Iconos para acciones

// Importar los componentes de modal necesarios para añadir, actualizar y eliminar tiendas
import { getTiendas } from "@AA/Tienda"; // Función para obtener los datos de las tiendas
import AddTiendaModal from "@CA/tiendas/AddTiendaModal"; // Modal para añadir una nueva tienda
import DeleteTiendaModal from "@CA/tiendas/DeleteTiendaModal"; // Modal para eliminar una tienda
import UpdateTiendaModal from "@CA/tiendas/UpdateTiendaModal"; // Modal para actualizar los detalles de la tienda

const { Meta } = Card; // Desestructuración del componente Meta de Ant Design

const TiendasCards = () => {
  const [id, setId] = useState(0); // Almacenar el ID de la tienda actual para actualizar o eliminar
  const [tiendas, setTiendas] = useState([]); // Datos de las tiendas
  const [reload, setReload] = useState(true); // Estado para recargar los datos

  const [OpenAddTienda, setOpenAddTienda] = useState(false); // Controlar la visibilidad del modal para añadir tienda
  const [OpenUpdateTienda, setOpenUpdateTienda] = useState(false); // Controlar la visibilidad del modal para actualizar tienda
  const [OpenDeleteTienda, setOpenDeleteTienda] = useState(false); // Controlar la visibilidad del modal para eliminar tienda

  const [values, setValues] = useState([]); // Almacenar los valores de la tienda seleccionada para editar

  // Obtener los datos de las tiendas cuando el componente se monta o cuando cambia el estado de recarga
  useEffect(() => {
    getTiendas(setTiendas); // Obtener la lista de tiendas desde la API
  }, [reload]); // Dependencia en `reload`, dispara la recarga de datos cuando cambia

  return (
    <>
      {/* Diseño en tarjeta para mostrar cada tienda */}
      <Flex wrap gap={"middle"} justify="space-evenly" gutter={20}>
        {tiendas.map((tienda, index) => (
          <Card 
            key={index} 
            title={tienda.tienda} // Título de la tienda
            style={{ header: { textAlign: "center", fontSize: "22px" }, body: { textAlign: "center", width: 300, overflow: "hidden" } }} // Estilo de la tarjeta
            actions={[
              // Botón para editar tienda con tooltip
              <Tooltip title="Editar Tienda" className={"card-update"} onClick={(e) => {
                e.stopPropagation(); // Evitar la propagación del clic
                setId(tienda.tienda_id); // Establecer el ID de la tienda seleccionada
                setValues(tienda); // Establecer los valores de la tienda seleccionada para actualizar
                setOpenUpdateTienda(true); // Abrir el modal para actualizar
              }}>
                <div>
                  <EditOutlined style={{ color: "white" }} />
                </div>
              </Tooltip>,
              // Botón para ver detalles de la tienda con tooltip
              <Tooltip title="Ver Detalles" className={"card-view"}>
                <Link to={`/admin/tiendas/${tienda.tienda_id}`}>
                  <EyeOutlined style={{ color: "white" }} key="view" />
                </Link>
              </Tooltip>,
              // Botón para eliminar tienda con confirmación emergente
              <Popconfirm
                title="¿ELIMINAR?"
                description="¿Está seguro de eliminar esta tienda?"
                okText="Confirmar"
                placement="bottom"
                onConfirm={(e) => {
                  e.stopPropagation(); // Evitar la propagación del clic
                  setId(tienda.tienda_id); // Establecer el ID de la tienda a eliminar
                  setOpenDeleteTienda(true); // Abrir el modal para eliminar
                }} 
                cancelText="Cancelar"
              >
                <Tooltip title="Eliminar Tienda" className={"card-delete"}>
                  <div>
                    <DeleteOutlined key="delete" style={{ color: "white" }} />
                  </div>
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            {/* Meta de la tarjeta para mostrar los detalles de la tienda */}
            <Meta
              title={<p>TELEFONO: {tienda.telefono}</p>} // Mostrar teléfono de la tienda
              description={
                <>
                  <p>STOCK: {tienda.total_stock ?? '0'}</p>
                  <p>DIRECCION: {tienda.direccion}</p>
                </>
              }
            />
          </Card>
        ))}
      </Flex>

      {/* Botón flotante para añadir una nueva tienda */}
      <FloatButton tooltip="Añadir" onClick={() => setOpenAddTienda(true)} />

      {/* Modales para añadir, actualizar y eliminar tienda */}
      <AddTiendaModal 
        openModal={OpenAddTienda}
        closeModal={() => setOpenAddTienda(false)} 
        reload={() => setReload(!reload)} // Recargar después de añadir una tienda
      />
      <UpdateTiendaModal
        openModal={OpenUpdateTienda}
        closeModal={() => setOpenUpdateTienda(false)} 
        id={id}
        reload={() => setReload(!reload)} // Recargar después de actualizar la tienda
        values={values} // Pasar los datos de la tienda seleccionada para actualizar
      />
      <DeleteTiendaModal
        openModal={OpenDeleteTienda}
        closeModal={() => setOpenDeleteTienda(false)} 
        id={id}
        reload={() => setReload(!reload)} // Recargar después de eliminar la tienda
      />
    </>
  );
};

export default TiendasCards; // Exportar el componente TiendasCards

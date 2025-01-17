import { useState } from "react";
import { useParams } from "react-router-dom";
import TiendaCard from "@CA/tiendas/TiendaCard";
import ProductosTable from "@CA/tiendas/ProductosTable";
import Tabla from "../../../Components/Tabla"
import { FileAddOutlined } from "@ant-design/icons"; // Icono para el botón de "Añadir"

import { FloatButton, Divider, Flex, Tabs } from "antd";
import * as Personal from "../../../interfaces/Personal";
import * as Ventas from "../../../interfaces/Ventas";
import * as Productos from "../../../interfaces/Productos";
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal"; // Modal para actualizar los datos de un trabajador
import AddPersonalModal from "@CA/tiendas/AddPersonalModal"; // Modal para añadir un nuevo trabajador
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto

const TiendaView = () => {
  // Definición de las pestañas con los componentes relacionados
  const { id } = useParams(); // Extraer el ID de la tienda de los parámetros de la URL
  const [idp, setIdP]  = useState(1); // Extraer el ID de la tienda de los parámetros de la URL
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [idPersonal, setIdPersonal] = useState(1); // Estado para almacenar el ID del trabajador seleccionado para editar
  const [ viewButton , setViewButton] = useState('none')
  const [modals, setModals] = useState({
    "updT": false,
    "addP": false,
    "proD": false,
  })
  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnasPro = Productos.getColumnas(changeModal, setIdPersonal, () => setReload(!reload))
  const columnasP = Personal.getColumnas(changeModal, setIdPersonal, () => setReload(!reload))
  const columnasV = Ventas.getColumnas(changeModal, setIdP, () => setReload(!reload))


  const items = [
    {
      key: '1', label: 'Productos',
      children: <Tabla
      columnas={columnasPro}
      rowKey={"trabajador_id"}
      url={Productos.getUrl(id)}
      reload={() => setReload(!reload)}
    />
    },
    {
      key: '2', label: 'Personal',
      children: <Tabla
        columnas={columnasP}
        rowKey={"trabajador_id"}
        url={Personal.getUrl(id)}
        reload={() => setReload(!reload)}
      />,
    },
    {
      key: '3', label: 'Ventas',
      children: <Tabla
        columnas={columnasV}
        rowKey={"venta_id"}
        dataSource={Ventas.getData()}
        reload={() => setReload(!reload)}
      />
    },
  ];

  return (
    <>
      {/* Divisor inicial */}
      <Divider>Detalles de la Tienda</Divider>

      {/* Contenedor flexible para la tarjeta y las pestañas */}
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
        {/* Componente de información de la tienda */}
        <TiendaCard style={{
          flex: "1 1 45%",
          minWidth: "400px", // Ancho mínimo
          maxWidth: "700px", // Ancho máximo
        }} />

        {/* Pestañas con los detalles de la tienda */}
        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
          onChange={(key)=>{
            key == '2' ? setViewButton('block'): setViewButton('none')
          }}
        />
      </Flex>

      <FloatButton tooltip="Añadir Nuevo Personal"
        onClick={() => changeModal("addP", true)}
        type="primary"
        style={{
          display: viewButton
        }}
        icon={<FileAddOutlined />} />

      {/* Modal para actualizar los detalles de un trabajador */}
      <UpdateTrabajadorModal
        openModal={modals.updT} // Visibilidad del modal
        closeModal={() => changeModal("updT", false)} // Cerrar el modal
        id={idPersonal} // Pasar el ID del trabajador al modal
        reload={() => setReload(!reload)} // Recargar después de actualizar
      />

      {/* Modal para añadir un nuevo trabajador */}
      <AddPersonalModal
        openModal={modals.addP} // Visibilidad del modal
        closeModal={() => changeModal("addP", false)} // Cerrar el modal
        id={id} // Pasar el ID de la tienda al modal
        reload={() => setReload(!reload)} // Recargar después de añadir un nuevo trabajador
      />

      {/* Modal para mostrar los detalles del producto */}
      <ProductoDetalleModal
        openModal={modals.proD} // Visibilidad del modal
        closeModal={() => changeModal("proD", false)} // Función para cerrar el modal
        id={id} // Pasar el ID de la tienda
        idp={idp} // Pasar el ID del producto seleccionado
      />
    </>
  );
};

export default TiendaView;

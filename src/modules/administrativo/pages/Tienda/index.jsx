import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons"; // Icono para el botón de "Añadir"

import { FloatButton, Divider, Flex, Tabs } from "antd";
import * as Personal from "../../../../interfaces/Personal";
import * as Ventas from "../../../../interfaces/Ventas";
import ProductosTable from "../../components/Tables/ProductosTable";
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal"; // Modal para actualizar los datos de un trabajador
import AddPersonalModal from "@CA/tiendas/AddPersonalModal"; // Modal para añadir un nuevo trabajador
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto
import { Details } from "../../../../layouts";
import TiendaDetailCard from "../../components/Cards/TiendaDetailCard";
import TrabajadoresTable from "../../components/Tables/TrabajadoresTable";
import VentasTable from "../../components/Tables/VentasTable";

const TiendaView = () => {
  // Definición de las pestañas con los componentes relacionados
  const { id } = useParams(); // Extraer el ID de la tienda de los parámetros de la URL
  const [idp, setIdP] = useState(1); // Extraer el ID de la tienda de los parámetros de la URL
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [personal, setPersonal] = useState([]); // Estado para almacenar el ID del trabajador seleccionado para editar
  const [viewButton, setViewButton] = useState("none");
  const [modals, setModals] = useState({
    updT: false,
    addP: false,
    proD: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnasP = Personal.getColumnas(changeModal, setPersonal, () =>
    setReload(!reload)
  );
  const columnasV = Ventas.getColumnas(changeModal, setIdP, () =>
    setReload(!reload)
  );

  const items = [
    {
      key: "1",
      label: "Productos (No test)",
      children: <ProductosTable id={id} />,
    },
    {
      key: "2",
      label: "Personal",
      children: <TrabajadoresTable params={`?tienda_id=${id}`} />,
    },
    {
      key: "3",
      label: "Ventas",
      children: (
        <VentasTable
          id={id}
        />
      ),
    },
  ];

  return (
    <>
      <Details>
        <TiendaDetailCard id={id} />

        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
          onChange={(key) => {
            key == "2" ? setViewButton("block") : setViewButton("none");
          }}
        />
      </Details>

      <FloatButton
        tooltip="Añadir Nuevo Personal"
        onClick={() => changeModal("addP", true)}
        type="primary"
        style={{
          display: viewButton,
        }}
        icon={<FileAddOutlined />}
      />

      {/* Modal para actualizar los detalles de un trabajador */}
      <UpdateTrabajadorModal
        openModal={modals.updT} // Visibilidad del modal
        closeModal={() => changeModal("updT", false)} // Cerrar el modal
        data={personal} // Pasar el ID del trabajador al modal
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

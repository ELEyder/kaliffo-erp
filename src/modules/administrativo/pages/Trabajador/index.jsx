import { useState } from "react"; // Importar hooks de React para manejar estado y ciclos de vida
import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la ruta
import { Tabla } from "../../../../Components/UI";
import { Divider, Tabs, Flex, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons"; // Icono de agregar para el botón flotante
import * as Incidencias from "../../../../interfaces/Incidencias";
import * as Horarios from "../../../../interfaces/Horarios";
import * as Pagos from "../../../../interfaces/Pagos";
import UpdateIncidenciaModal from "@CA/trabajadores/UpdateIncidenciaModal"; // Componente modal para actualizar incidencias
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal"; // Componente modal para agregar nuevas incidencias
import { Details } from "../../../../layouts";
import TrabajadorCard from "../../components/Cards/TrabajadorCard";
import IncidenciasTable from "../../components/Tables/IncidenciasTable";

const Trabajador = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [incidencia, setIncidencia] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [modals, setModals] = useState({
    addI: false,
    updI: false,
  });
  const [ActiveTab, setActiveTab] = useState("Incidencias");
  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnasI = Incidencias.getColumnas(changeModal, setIncidencia, () =>
    setReload(!reload)
  );
  const columnasH = Horarios.getColumnas(() => setReload(!reload));
  const columnasP = Pagos.getColumnas(() => setReload(!reload));

  // Definición de las pestañas que se mostrarán
  const items = [
    {
      key: "Incidencias",
      label: "Incidencias",
      children: (
        <IncidenciasTable
          id={id}
        />
      ), // Componente que muestra las incidencias
    },

  ];

  return (
    <>
      <Divider>Detalles del Usuario</Divider>
      <Details>
        <TrabajadorCard id={id} />

        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
          onChange={(key) => {
            setActiveTab(key);
          }}
        />
      </Details>
      <Divider></Divider>
      
    </>
  );
};

export default Trabajador;

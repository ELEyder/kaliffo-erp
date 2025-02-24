import { useState } from "react"; // Importar hooks de React para manejar estado y ciclos de vida
import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la ruta
import { Tabla } from "../../../../Components/UI";
import { Divider, Tabs } from "antd";
import * as Incidencias from "../../../../interfaces/Incidencias";
import * as Horarios from "../../../../interfaces/Horarios";
import * as Pagos from "../../../../interfaces/Pagos";
import { Details } from "../../../../layouts";
import { TrabajadorCard } from "../../components/Cards/";
import { IncidenciasTable, PagosTable } from "../../components/Tables";

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
    {
      key: "Horario",
      label: "Horario",
      children: (
        <Tabla
          columnas={columnasH}
          rowKey={"horario_id"}
          url={Horarios.getUrl(id)}
          reload={() => setReload(!reload)}
        />
      ),
    }, // Componente que muestra los pagos
    {
      key: "Pagos",
      label: "Pagos",
      children: (
        <PagosTable
          id={id}
        />
      ),
    }, // Componente que muestra los horarios
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

import { useState } from "react"; // Importar hooks de React para manejar estado y ciclos de vida
import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la ruta
import { Tabla } from "../../../../Components/UI";
import { Divider, Tabs } from "antd";
import { Details } from "../../../../layouts";
import { TrabajadorCard } from "../../components/Cards/";
import { IncidenciasTable, PagosTable } from "../../components/Tables";
import HorariosTable from "../../components/Tables/HorariosTable";

const Trabajador = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar

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
        <HorariosTable
          id={id}
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
        />
      </Details>
      <Divider></Divider>
    </>
  );
};

export default Trabajador;

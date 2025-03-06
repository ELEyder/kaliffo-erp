import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la ruta
import { Divider, Tabs } from "antd";
import { Details } from "../../../../layouts";
import { TrabajadorCard } from "../../components/Cards/";
import {
  IncidenciasTable,
  PagosTable,
  HorariosTable,
} from "../../components/Tables";

const Trabajador = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL

  const items = [
    {
      key: "Incidencias",
      label: "Incidencias",
      children: <IncidenciasTable id={id} />,
    },
    {
      key: "Horario",
      label: "Horario",
      children: <HorariosTable id={id} />,
    },
    {
      key: "Pagos",
      label: "Pagos",
      children: <PagosTable id={id} />,
    },
  ];

  return (
    <>
      <Divider>Detalles del Usuario</Divider>
      <Details>
        <TrabajadorCard id={id} />
        <Tabs items={items} />
      </Details>
    </>
  );
};

export default Trabajador;

import {
  Dropdown,
} from "antd";
import { getReporteUsuario } from "@AA/Reporte";
import useTrabajador from "../../hooks/useTrabajador";
import DefaultCard from "./DefaultCard";

const TrabajadorCard = ({ id }) => {
  const items = [
    {
      key: "1",
      label: "Historico",
    },
    {
      key: "2",
      label: "Ultimo Mes",
    },
  ];

  const { trabajador } = useTrabajador(id);

  const images = [
    "eyder1.jpg",
    "eyder2.jpg",
    "eyder3.jpg",
    "eyder4.jpg",
    "eyder5.gif",
  ];

  const img =
    trabajador.nombre === "Rodrigo"
      ? `/img/usuarios/rodrigo.jpg`
      : trabajador.nombre === "Pablo"
      ? `/img/usuarios/pablo.jpg`
      : trabajador.nombre === "Eyder"
      ? `/img/usuarios/${images[Math.floor(Math.random() * 5)]}`
      : `/img/usuarios/${trabajador.usuario_id}.jpg`;

  return (
      <DefaultCard
        title={trabajador.nombres}
        image={img}
        list={[
          { title: "DNI", value: trabajador.dni },
          { title: "TELÉFONO", value: trabajador.telefono },
          {
            title: "HORAS TRABAJADAS",
            value: trabajador.total_horas_trabajadas,
          },
          { title: "NUM. INCIDENCIAS", value: trabajador.total_incidencias },
          { title: "SALARIO", value: "S/ " + trabajador.sueldo },
        ]}
      >
        <Dropdown.Button
          menu={{ items, onClick: ({ key }) => getReporteUsuario(id, key) }}
          block
          size="large"
          style={{ fontWeight: "bold" }}
        >
          OBTENER REPORTE
        </Dropdown.Button>
      </DefaultCard>
  );
};

export default TrabajadorCard;

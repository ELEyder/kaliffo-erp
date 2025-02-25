import { Dropdown } from "antd";
import { getReporteUsuario } from "@AA/Reporte";
import useTrabajador from "../../hooks/useTrabajador";
import DefaultCard from "./DefaultCard";
import { useMemo } from "react";

// Lista de reportes
const items = [
  { key: "1", label: "Histórico" },
  { key: "2", label: "Último Mes" },
];

// Maneja la obtención del reporte
const handleReporteClick = (id) => ({ key }) => getReporteUsuario(id, key);

const TrabajadorCard = ({ id }) => {
  const { trabajador } = useTrabajador(id);

  const img = useMemo(() => {
    const imageMap = {
      Rodrigo: "/img/usuarios/rodrigo.jpg",
      Pablo: "/img/usuarios/pablo.jpg",
    };
    const images = [
      "eyder1.jpg",
      "eyder2.jpg",
      "eyder3.jpg",
      "eyder4.jpg",
      "eyder5.gif",
    ];
    return imageMap[trabajador.nombre]
      ? imageMap[trabajador.nombre]
      : trabajador.nombre === "Eyder"
      ? `/img/usuarios/${images[Math.floor(Math.random() * images.length)]}`
      : `/img/usuarios/${trabajador.usuario_id}.jpg`;
  }, [trabajador]);

  const { nombres, dni, telefono, total_horas_trabajadas, total_incidencias, sueldo } = trabajador;

  return (
    <DefaultCard
      title={nombres}
      image={img}
      list={[
        { title: "DNI", value: dni },
        { title: "TELÉFONO", value: telefono },
        { title: "HORAS TRABAJADAS", value: total_horas_trabajadas },
        { title: "NUM. INCIDENCIAS", value: total_incidencias },
        { title: "SALARIO", value: `S/ ${sueldo}` },
      ]}
    >
      <Dropdown.Button
        menu={{ items, onClick: handleReporteClick(id) }}
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

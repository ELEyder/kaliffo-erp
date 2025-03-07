import { useEffect } from "react";
import { DefaultCard } from "../../../../components/UI";
import { useReporte, useTrabajador } from "../../hooks";
import { Dropdown } from "antd";

const items = [
  { key: "1", label: "Histórico" },
  { key: "2", label: "Último Mes" },
];

const TrabajadorCard = ({ id }) => {
  const { trabajador, getTrabajador } = useTrabajador();
  const { getReporteTrabajador } = useReporte();

  useEffect(() => {
    getTrabajador(id);
  }, [id]);

  const handleReporteClick =
    (id) =>
    ({ key }) =>
      getReporteTrabajador(id, key);

  const {
    nombres,
    dni,
    telefono,
    total_horas_trabajadas,
    total_incidencias,
    sueldo,
  } = trabajador;

  return (
    <DefaultCard
      title={nombres}
      image={`./img/usuarios/${id}.jpg`}
      list={[
        { title: "DNI", value: dni },
        { title: "TELÉFONO", value: telefono },
        { title: "HORAS TRABAJADAS", value: total_horas_trabajadas },
        { title: "NUM. INCIDENCIAS", value: total_incidencias },
        { title: "SALARIO", value: `S/ ${sueldo || 0}` },
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

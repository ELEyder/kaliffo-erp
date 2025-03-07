import { Dropdown } from "antd";
import { getReporteUsuario } from "@AA/Reporte";
import useTrabajador from "../../hooks/useTrabajador";
import { useEffect } from "react";
import { DefaultCard } from "../../../../components/UI";

// Lista de reportes
const items = [
  { key: "1", label: "Histórico" },
  { key: "2", label: "Último Mes" },
];

// Maneja la obtención del reporte
const handleReporteClick =
  (id) =>
  ({ key }) =>
    getReporteUsuario(id, key);

const TrabajadorCard = ({ id }) => {
  const { trabajador, getTrabajador } = useTrabajador();
  
  useEffect(() => {
    getTrabajador(id);
  }, [id]);

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

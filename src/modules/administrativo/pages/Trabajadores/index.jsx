import { useParams, Navigate } from "react-router-dom";
import { Divider } from "antd";
import { TrabajadoresTable } from '../../components/Tables';

const Trabajadores = () => {
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };
  const { tipoTrabajador } = useParams();

  if (!Object.keys(tiposTrabajador).includes(tipoTrabajador)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>{tipoTrabajador}</Divider>

      <TrabajadoresTable
        tipoTrabajador={tipoTrabajador}
      />
    </>
  );
};

export default Trabajadores;

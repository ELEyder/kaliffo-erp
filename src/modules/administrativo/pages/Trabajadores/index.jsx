import { useParams, Navigate } from "react-router-dom";
import { Divider } from "antd";
import { TrabajadoresTable } from '../../components/Tables';

const Trabajadores = () => {

  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>Trabajadores</Divider>

      <TrabajadoresTable />
    </>
  );
};

export default Trabajadores;

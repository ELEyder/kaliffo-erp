import { useEffect, useState } from 'react';
import { useParams, Navigate } from "react-router-dom";
import { Divider, FloatButton } from "antd";
import { TrabajadoresTable } from '../../components/Tables';

const Trabajadores = () => {
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };
  const { tipoTrabajador } = useParams();
  const [reload, setReload] = useState(true)
  const [columnas, setColumnas] = useState([])
  const [URL, setURL] = useState(`/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`)

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

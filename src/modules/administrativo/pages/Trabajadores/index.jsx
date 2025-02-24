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
      {/* Divisor estilizado que muestra el tipoTrabajador */}
      <Divider style={{ textTransform: "uppercase" }}>{tipoTrabajador}</Divider>

      <TrabajadoresTable tipoTrabajador={tipoTrabajador}
        columnas={columnas}
        rowKey={"trabajador_id"}
        url={URL}
        reload={reload}
      />

      {/* Tabla que muestra los trabajadores según el tipoTrabajador */}


    </>
  );
};

export default Trabajadores;

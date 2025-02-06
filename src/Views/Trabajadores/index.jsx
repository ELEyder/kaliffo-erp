import { useEffect, useState } from 'react';
import { useParams, Navigate } from "react-router-dom";
import Tabla from "../../Components/Tabla/Tabla";
import ITrabajadores from '../../interfaces/ITrabajadores';
import { Divider, FloatButton } from "antd";
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal";
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal";
import AddTrabajadorModal from "@CA/trabajadores/AddTrabajadorModal";

const Trabajadores = () => {
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };
  const { tipoTrabajador } = useParams();
  const [reload, setReload] = useState(true)
  const [columnas, setColumnas] = useState([])
  const [URL, setURL] = useState(`/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`)
  const [dataTrabajador, setDataTrabajador] = useState([])
  const [modals, setModals] = useState({
    addT: false,
    addI: false,
    updT: false
  })

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

// useEffect para actualizar la URL y las columnas
useEffect(() => {
  setURL(`/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`);
  let columnas2 = ITrabajadores(tipoTrabajador, changeModal, setDataTrabajador, () => setReload(!reload));
  setColumnas(columnas2);
}, [tipoTrabajador]); // Dependencia de tipoTrabajador


  if (!Object.keys(tiposTrabajador).includes(tipoTrabajador)) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      {/* Divisor estilizado que muestra el tipoTrabajador */}
      <Divider style={{ textTransform: "uppercase" }}>{tipoTrabajador}</Divider>
      <Tabla
        columnas={columnas}
        rowKey={"trabajador_id"}
        url={URL}
        reload={reload}
      />

      {/* Tabla que muestra los trabajadores según el tipoTrabajador */}

      <FloatButton
        tooltip="Añadir nuevo trabajador"
        onClick={() => changeModal("addT", true)}
      />

      <AddTrabajadorModal
        openModal={modals.addT}
        closeModal={() => changeModal("addT", false)}
        tipoTrabajador={tipoTrabajador}
        reload={() => setReload(!reload)}
      />

      <UpdateTrabajadorModal
        openModal={modals.updT}
        closeModal={() => changeModal("updT", false)}
        tipoTrabajador={tipoTrabajador}
        reload={() => setReload(!reload)}
        data={dataTrabajador}
      />

      <AddIncidenciaModal
        openModal={modals.addI}
        closeModal={() => changeModal("addI", false)}
        reload={() => setReload(!reload)}
        data={dataTrabajador}
      />

    </>
  );
};

export default Trabajadores;

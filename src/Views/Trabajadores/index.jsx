import { useState } from 'react';
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
  const [id, setId] = useState(0)
  const [modals, setModals] = useState({
    addT: false,
    addI: false,
    updT: false
  })

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = ITrabajadores(tipoTrabajador, changeModal, setId, () => setReload(!reload))

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
        url={`/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`}
        reload={() => setReload(!reload)}
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
        id={id}
      />

      <AddIncidenciaModal
        openModal={modals.addI}
        closeModal={() => changeModal("addI", false)}
        reload={() => setReload(!reload)}
        id={id}
      />
      {/* 

      

       */}
    </>
  );
};

export default Trabajadores;

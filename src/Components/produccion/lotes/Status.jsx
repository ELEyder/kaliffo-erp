import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "@CP/lotes/ChangeStatusModal";  // Modal para cambiar estado en el Corte
import ChangeStatusAcabado from "@CP/lotes/ChangeStatusAcabado";  // Modal para cambiar estado en Acabados
import { changeStatusLavanderia } from "../../../API/produccion/Lavanderia";  // Función para cambiar estado en Lavandería
import AddTaller from "@CP/lotes/AddTaller";  // Modal para agregar un taller
import styles from './Status.module.css';  // Estilos específicos para el estado
import { changeStatusAcabado } from "../../../API/produccion/Acabado";  // Función para cambiar estado en Acabado

const Status = ({ fase, status, reload }) => {
  const [OpenChangeStatus, setOpenChangeStatus] = useState(false);  // Controla la visibilidad del modal de cambio de estado en Corte
  const [OpenChangeStatusAcabado, setOpenChangeStatusAcabado] = useState(false);  // Controla la visibilidad del modal de cambio de estado en Acabado
  const [OpenAddTaller, setOpenAddTaller] = useState(false);  // Controla la visibilidad del modal de agregar taller
  const { id } = useParams();  // Obtener el ID desde los parámetros de la URL

  // Función que maneja el cambio de estado según la fase
  const eventStatus = async () => {
    if (status == 0) {
      alert("agrega un elemento");
    }
    // Fase Corte
    else if (fase == 1) {
      if (status == 1) {
        setOpenAddTaller(true);  // Abre el modal para agregar un taller si está en estado 1
      }
      else if (status == 2) {
        setOpenChangeStatus(true);  // Abre el modal para cambiar estado en Corte si está en estado 2
        reload();  // Recarga los datos
      }
    }
    // Fase Lavandería
    else if (fase == 2) {
      if (status == 1) {
        await changeStatusLavanderia(id);  // Cambia el estado de Lavandería
        reload();  // Recarga los datos
      } else if (status == 2) {
        setOpenChangeStatus(true);  // Abre el modal para cambiar estado en Lavandería si está en estado 2
        reload();
      }
    }
    // Fase Acabados
    else if (fase == 3) {
      if (status == 1) {
        await changeStatusAcabado(id);  // Cambia el estado de Acabado
        await reload();  // Recarga los datos
      } else if (status == 2) {
        setOpenChangeStatusAcabado(true);  // Abre el modal para cambiar estado en Acabados si está en estado 2
      }
    }
  };

  // Texto de las fases según el estado
  const fasesText = ["", "Iniciar", "En Proceso", "Finalizado"];

  return (
    <>
      {/* Contenedor de estado con estilo dinámico según el estado */}
      <div className={`${styles.status} ${styles[`status-${status}`]}`} onClick={eventStatus}>
        <img className={styles.statusIcon} src="/svg/status/play.svg" alt="" />
        <h1>{fasesText[status]}</h1>  {/* Muestra el texto correspondiente al estado */}
      </div>

      {/* Modal para cambiar estado en Corte */}
      <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={() => setOpenChangeStatus(false)}
        reload={reload}
        fase={fase}
      />

      {/* Modal para cambiar estado en Acabado */}
      <ChangeStatusAcabado
        openModal={OpenChangeStatusAcabado}
        closeModal={() => setOpenChangeStatusAcabado(false)}
        reload={reload}
        fase={fase}
      />

      {/* Modal para agregar taller */}
      <AddTaller
        openModal={OpenAddTaller}
        closeModal={() => setOpenAddTaller(false)}
        reload={reload}
      />
    </>
  );
};

export default Status;

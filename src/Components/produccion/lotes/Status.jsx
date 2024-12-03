import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "@CP/lotes/ChangeStatusModal";
import { changeStatusLavanderia } from "../../../API/produccion/Lavanderia";
import AddTaller from "@CP/lotes/AddTaller";
import styles from "./Status.module.css";

const Status = ({ fase, status, reload, setReload }) => {
  const [OpenChangeStatus, setOpenChangeStatus] = useState(false);
  const [OpenAddTaller, setOpenAddTaller] = useState(false);
  const { id } = useParams();

  const eventStatus = async () => {
    if (status == 0) {
      alert("agrega un elemento");
    }
    // CORTE
    else if (fase == 1) {
      if (status == 1) {
        setOpenAddTaller(true);
      } else if (status == 2) {
        setOpenChangeStatus(true);
        setReload(!reload);
      } else if (status == 3) {
        setOpenChangeStatus(true);
      }
    }
    // LAVANDERIA
    else if (fase == 2) {
      if (status == 1) {
        await changeStatusLavanderia(id);
        await setReload(!reload);
      } else if (status == 2) {
        setOpenChangeStatus(true);
      }
    }
  };
  return (
    <>
      <div
        className={`${styles.status} ${styles[`status-${status}`]}`}
        onClick={()=>{
          if(status!=3){
            eventStatus
          }
        }}
      >
        <img className={styles.statusIcon} src="/svg/status/play.svg" alt="" />
        {status === 1 ? (
          <h1>Inicio</h1>
        ) : status === 2 ? (
          <h1>Proceso</h1>
        ) : status === 3 ? (
          <h1>Finalizado</h1>
        ) : <h1>Inicio</h1>}
      </div>

      <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={() => setOpenChangeStatus(false)}
        reload={() => setReload(!reload)}
        fase={fase}
      />

      <AddTaller
        openModal={OpenAddTaller}
        closeModal={() => setOpenAddTaller(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default Status;

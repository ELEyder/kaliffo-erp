import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "@CP/lotes/ChangeStatusModal"
import AddTaller from "@CP/lotes/AddTaller"
import { getStatusCorte, changeStatusCorte } from "@AP/Corte";
import { getStatusLavanderia, changeStatusLavanderia } from "@AP/Lavanderia";
import styles from './Status.module.css'

const Status = ({ fase, status, reload, setReload }) => {
  const [OpenChangeStatus, setOpenChangeStatus] = useState(false);
  const [OpenAddTaller, setOpenAddTaller] = useState(false);
  const { id } = useParams();

  const eventStatus = async () => {
    if (status == 0) {
      alert('agrega un elemento')
    }
    else if (fase == 1) {
      if (status == 1) {
        setOpenAddTaller(true)
      }
      else if (status == 2) {
        setOpenChangeStatus(true)
        setReload(!reload)
      } else if (status == 3) {
        setOpenChangeStatus(true)
      }
    }
    else if (fase == 2) {
      if (status == 1 || status == 2) {
        await changeStatusLavanderia(id)
        await getStatus();
      } else if (status == 3) {
        setOpenChangeStatus(true)
      }
    }

  }
  return (
    <>
      <div className={`${styles.status} ${styles[`status-${status}`]}`} onClick={eventStatus}>
        <img className={styles.statusIcon} src="/svg/status/play.svg" alt="" />
        <h1>Iniciar</h1>
      </div>

      <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={() => setOpenChangeStatus(false)}
        reload={() => setReload(!reload)}
      />

      <AddTaller
        openModal={OpenAddTaller}
        closeModal={() => setOpenAddTaller(false)}
        reload={() => setReload(!reload)}
      />

    </>
  )
}

export default Status
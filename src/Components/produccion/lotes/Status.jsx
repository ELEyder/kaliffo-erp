import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "@CP/lotes/ChangeStatusModal"
import AddTaller from "@CP/lotes/AddTaller"
import { getStatusCorte, changeStatusCorte } from "@AP/Corte";
import { getStatusLavanderia, changeStatusLavanderia } from "@AP/Lavanderia";
import { getFase } from "@AP/Lote";
import styles from './Status.module.css'

const Status = ({reload}) => {
    const [ OpenChangeStatus, setOpenChangeStatus ] = useState(false);
    const [ OpenAddTaller, setOpenAddTaller ] = useState(false);
    const [ status, setStatus ] = useState(false);
    const [ fase, setFase ] = useState(0);
    const { id } = useParams();
  const getStatus = async () => {
    getFase(id, setFase)
    if (fase == 1) {
      getStatusCorte(id, setStatus);
    }
    if (fase == 2) {
      getStatusLavanderia(id, setStatus);
    }

  }
    useEffect(() => {
      getStatus()
      }, [reload]);

      const eventStatus = async () => {
        if (status == 0){
          setOpenAddTaller(true)
        }
        else if (fase == 1) {
          if (status == 1){
            setOpenAddTaller(true)
          }
          else if (status == 2) {
            await changeStatusCorte(id)
            await getStatus();
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
    return(
        <>
        <div className={`${styles.status} ${styles[`status-${status}`]}`} onClick={eventStatus}>
            <img className={styles.statusIcon} src="/svg/status/play.svg" alt="" />
            <h1>Iniciar</h1>
        </div>

        <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={()=>setOpenChangeStatus(false)}
        />
          
        <AddTaller
        openModal={OpenAddTaller}
        closeModal={()=>setOpenAddTaller(false)}
        />

        </>
    )
}

export default Status
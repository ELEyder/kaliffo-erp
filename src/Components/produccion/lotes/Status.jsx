import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "../Modals/ChangeStatusModal"
import { getStatusCorte, changeStatusCorte } from "@A/prod/lote/Corte";
import { getStatusLavanderia, changeStatusLavanderia } from "@A/prod/lote/Lavanderia";
import { getFase } from "@A/prod/lote/Lote";
import "@/assets/css/status/status.css"

const Status = ({reload}) => {
    const [ OpenChangeStatus, setOpenChangeStatus ] = useState(false);
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
        if (fase == 1) {
          if (status == 1 || status == 2) {
            await changeStatusCorte(id)
            await getStatus();
        } else if (status == 3) {
            setOpenChangeStatus(true)
        }
        }
        if (fase == 2) {
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
        <div className={`status status-${status}`} onClick={eventStatus}>
            <img className="status-icon" src="/svg/status/play.svg" alt="" />
            <h1>Iniciar</h1>
        </div>

        <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={()=>setOpenChangeStatus(false)}
        >

        </ChangeStatusModal>
        </>
    )
}

export default Status
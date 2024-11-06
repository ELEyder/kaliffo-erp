import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "../Modals/ChangeStatusModal"
import { Card } from "antd";
import { getStatusCorte } from "../../API/Corte";
import { changeStatus } from "../../API/Lote"

const Status = () => {
    const [ OpenChangeStatus, setOpenChangeStatus ] = useState(false);
    const [ statusCorte, setStatusCorte ] = useState(false);
  const { id } = useParams();

    useEffect(() => {
        getStatusCorte(id, setStatusCorte);
      }, [id]);

      const eventStatus = async () => {
        if (statusCorte == 1 || statusCorte == 2) {
            await changeStatus(id)
            await getStatusCorte(id, setStatusCorte);
        } else if (statusCorte == 3) {
            setOpenChangeStatus(true)
        }
      } 
    return(
        <>
        <link rel="stylesheet" href="/css/status/status.css" />
        <Card className={`status status-${statusCorte}`} onClick={eventStatus}>
            <img src="/svg/status/play.svg" alt="" />
            <h1>Iniciar</h1>
        </Card>

        <ChangeStatusModal
        openModal={OpenChangeStatus}
        closeModal={()=>setOpenChangeStatus(false)}
        >

        </ChangeStatusModal>
        </>
    )
}

export default Status
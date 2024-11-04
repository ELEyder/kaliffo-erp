import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeStatusModal from "../Modals/ChangeStatusModal"
import { Card, Col } from "antd";

const Status = () => {
    const { id } = useParams()
    const [ OpenChangeStatus, setOpenChangeStatus ] = useState(false);

    return(
        <>
        <Card className="status" onClick={()=>setOpenChangeStatus(true)}>
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
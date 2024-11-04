import React from "react";
import { useParams } from "react-router-dom";

const Status = () => {
    const { id } = useParams()
    return(
        <div className="status">
            <img src="/svg/status/play.svg" alt="" />
            <h1>Iniciar</h1>
        </div>
    )
}

export default Status
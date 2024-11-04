import React from "react";
import Cortes from "./Cortes/Cortes";
import TimeLine from "./TimeLine/TimeLine";
import { Divider } from "antd";
const Lote = () => {
    return(
        <>
            <Divider>DETALLES DEL LOTE</Divider>
            <TimeLine></TimeLine>
            <Cortes/>
        </>
    )
}

export default Lote
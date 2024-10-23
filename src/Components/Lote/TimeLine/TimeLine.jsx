
import React from "react";
import { useParams } from "react-router-dom";
import { Tooltip } from "antd";

const TimeLine = () => {
    return(
        <div className="loteIcons">
        <Tooltip title="Corte">
        <div className="loteIcon">
        <img className="svgLote" src="/svg/lote/1.svg" alt="" />
        </div>
        </Tooltip>
        <Tooltip title="Lavandería">
        <div className="loteIcon">
        <img className="svgLote" src="/svg/lote/2.svg" alt="" />
        </div>
        </Tooltip>
        <Tooltip title="Taller">
        <div className="loteIcon">
        <img className="svgLote" src="/svg/lote/3.svg" alt="" />
        </div>
        </Tooltip>
        <Tooltip title="Almacen">
        <div className="loteIcon">
        <img className="svgLote" src="/svg/lote/4.svg" alt="" />
        </div>
        </Tooltip>
        </div>
    )
}

export default TimeLine

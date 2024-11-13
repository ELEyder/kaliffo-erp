
import React from "react";
import { Tooltip } from "antd";
import styles from './TimeLine.module.css'

const TimeLine = ({ fase }) => {
    return (
        <div className={styles.loteIcons}>
            <Tooltip title="Corte">
                <div className={styles.loteIcon}>
                    <img className={styles.svgLote} src="/svg/lote/1.svg" alt="" />
                </div>
            </Tooltip>
            <Tooltip title="Lavandería">
                <div className={styles.loteIcon}>
                    <img className={styles.svgLote} src="/svg/lote/2.svg" alt="" />
                </div>
            </Tooltip>
            <Tooltip title="Taller de Acabados Finales">
                <div className={styles.loteIcon}>
                    <img className={styles.svgLote} src="/svg/lote/3.svg" alt="" />
                </div>
            </Tooltip>
            <Tooltip title="Almacen">
                <div className={styles.loteIcon}>
                    <img className={styles.svgLote} src="/svg/lote/4.svg" alt="" />
                </div>
            </Tooltip>
        </div>
    )
}

export default TimeLine

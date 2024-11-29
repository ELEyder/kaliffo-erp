import React from "react";
import { Tooltip } from "antd";
import styles from "./TimeLine.module.css";

const TimeLine = ({ fase, setFase, faseTimeline }) => {
  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];
  const statusColors = Array(fase + 1).fill(colors[fase]);
  statusColors.push(...Array(4 - fase).fill("white"));
  console.log(faseTimeline);
  return (
    <div className={styles.loteIcons}>
      {["Corte", "Lavandería", "Taller de Acabados Finales", "Almacen"].map(
        (title, index) => (
          <Tooltip key={index} title={title}>
            <div
              onClick={() => {
                if(index+1<=faseTimeline){
                  setFase(index+1)
                }
              }}
              className={styles.loteIcon}
              style={{ backgroundColor: statusColors[index + 1] }}
            >
              <img
                className={styles.svgLote}
                src={`/svg/lote/${index + 1}.svg`}
                alt={title}
              />
            </div>
          </Tooltip>
        )
      )}
    </div>
  );
};

export default TimeLine;

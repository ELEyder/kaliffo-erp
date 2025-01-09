import { Tooltip } from "antd";
import styles from "./TimeLine.module.css";  // Estilos específicos para la línea de tiempo

const TimeLine = ({ fase, setFase, faseTimeline, reload }) => {
  // Colores asociados a cada fase
  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];

  // Arreglo de colores para cada fase, según el estado actual (fase)
  let statusColors = Array(fase + 1).fill(colors[fase]);
  statusColors.push(...Array(4 - fase).fill("white"));  // Rellenar los colores faltantes hasta 4 fases

  return (
    <div className={styles.loteIcons}>
      {/* Mapeo de las fases con Tooltips y la acción de cambiar fase */}
      {["Corte", "Lavandería", "Taller de Acabados Finales", "Almacen"].map(
        (title, index) => (
          <Tooltip key={index} title={title}>
            {/* Cada icono de fase se puede seleccionar solo si la fase está permitida por faseTimeline */}
            <div
              onClick={() => {
                if (index + 1 <= faseTimeline) {  // Verifica si la fase es accesible
                  setFase(index + 1);  // Cambia la fase al seleccionar el ícono
                }
              }}
              className={styles.loteIcon}
              style={{ backgroundColor: statusColors[index + 1] }}  // Colorea según el estado de la fase
            >
              {/* Imagen SVG para cada fase */}
              <img
                className={styles.svgLote}
                src={`/svg/lote/${index + 1}.svg`}  // Ruta de la imagen SVG de la fase
                alt={title}  // Texto alternativo para la imagen
              />
            </div>
          </Tooltip>
        )
      )}
    </div>
  );
};

export default TimeLine;

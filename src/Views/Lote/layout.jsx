import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Flex, Tooltip } from "antd";
import styles from './index.module.css'

import Status from "@CP/lotes/Status";
import { getFaseLote, getStatus } from "@AP/Lote";
import { Outlet } from 'react-router-dom'; // Importamos Navigate y Outlet para manejar la navegación y el renderizado de rutas secundarias
import Almacen from "./Almacen";

const LoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [fase, setFase] = useState(0);
  const [status, setStatus] = useState(0);
  const allFases = [
    {
      title: "Corte",
      url: "corte",
      color: "#9481fe"
    },
    {
      title: "Lavandería",
      url: "lavanderia",
      color: "#49adfe"
    },
    {
      title: "Taller de Acabados Finales",
      url: "acabados",
      color: "#49adfe"
    },
    {
      title: "Almacén",
      url: "almacen",
      color: "#7bfe56"
    }
  ]
  const currentPath = location.pathname.split("/").pop();

  const currentIndex = allFases.findIndex(fase => fase.url === currentPath);

  const currentFase = allFases.find(fase => fase.url === currentPath);

  const currentColor = currentFase ? currentFase.color : "white";

  let statusColors = Array(currentIndex + 2).fill(currentColor);
  statusColors.push(...Array(allFases.length - (currentIndex + 1)).fill("white"));

  useEffect(() => {
    getStatus(id, fase, setStatus)
    getFaseLote(id, setFase);
  }, [reload, fase, status]);


  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <Divider >{currentPath.toUpperCase()}</Divider>
      <div>
        <div className={styles.loteIcons}>
          {allFases.map(
            (f, index) => (
              <Tooltip key={index} title={f.title}>
                <div
                  onClick={() => {
                    if (index < fase)
                    navigate(`/lotes/${id}/${f.url}`)
                  }}
                  className={styles.loteIcon}
                  style={{ backgroundColor: statusColors[index + 1] }}  // Colorea según el estado de la fase
                >
                  <img
                    className={styles.svgLote}
                    src={`/svg/lote/${index + 1}.svg`}  // Ruta de la imagen SVG de la fase
                    alt={f.title}  // Texto alternativo para la imagen
                  />
                </div>
              </Tooltip>
            )
          )}
        </div>
      </div>
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          flex: 1,
          maxWidth: "1200px", // Máxima anchura del contenedor
          margin: "0 auto", // Centrado horizontal
          padding: "1rem", // Espaciado interno
        }}
      >
        <div style={ currentFase != "almacen" ? { flex: 1, height: "100%"} : { flex: 1}} >
          <Outlet context={{ reload, setReload }} /> {/* Este ocupará todo el espacio disponible */}
        </div>
          {(currentPath != "almacen") ? (
        <div >
            <Status fase={fase} status={status} reload={() => setReload(!reload)} />
        </div>
          ) : null}
      </Flex>
    </div>
  );
};

export default LoteView;

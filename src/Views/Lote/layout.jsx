import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Flex, Tooltip } from "antd";
import styles from './index.module.css'

import Status from "@CP/lotes/Status";
import { getFaseLote, getStatus } from "@AP/Lote";
import Loading from "../../Components/Loading/Loading";
import { Outlet } from 'react-router-dom'; // Importamos Navigate y Outlet para manejar la navegación y el renderizado de rutas secundarias

const LoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [fase, setFase] = useState(0);
  const [status, setStatus] = useState(0);

  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];

  let statusColors = Array(fase + 1).fill(colors[fase]);
  statusColors.push(...Array(4 - fase).fill("white"));

  const fetchGetStatus = async () => {
    if (fase > 0) {
      await getStatus(id, fase, setStatus);
    }
  };

  const fetchGetFase = async () => {
    await getFaseLote(id, setFase);
    await fetchGetStatus();
  };

  useEffect(() => {
    fetchGetFase();
  }, []);

  useEffect(() => {
    fetchGetStatus();
  }, [reload]);

  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <div>
        <div className={styles.loteIcons}>
          {[
            {
              title: "Corte",
              url: "corte"
            },
            {
              title: "Lavandería",
              url: "lavanderia"
            },
            {
              title: "Taller de Acabados Finales",
              url: "acabados"
            },
            {
              title: "Almacén",
              url: "almacen"
            }
          ].map(
            (f, index) => (
              <Tooltip key={index} title={f.title}>
                <div
                  onClick={() => {
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
      <Flex>
        <Suspense fallback={<Loading />}>
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </Suspense>
        {status != 0 ? (
          <Status fase={fase} status={status} reload={() => setReload(!reload)} />
        ) : null}
      </Flex>
    </>
  );
};

export default LoteView;

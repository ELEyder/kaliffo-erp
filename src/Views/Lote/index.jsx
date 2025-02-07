import React, { useState, useEffect, lazy, Suspense } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Divider, Row, Col, Tooltip } from "antd";
import styles from './index.module.css'

import Status from "@CP/lotes/Status";
import { getFaseLote, getStatus } from "@AP/Lote";
import Loading from "../../Components/Loading/Loading";
// Lazy load de las tablas
const CortesTable = lazy(() => import("@CP/lotes/CortesTable"));
const LavanderiaTable = lazy(() => import("@CP/lotes/LavanderiaTable"));
const TallerTable = lazy(() => import("../../Components/produccion/lotes/AcabadoTable"));

const LoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [fase, setFase] = useState(0);
  const [maxFase, setMaxFase] = useState(0);
  const [status, setStatus] = useState(0);

  // Colores asociados a cada fase
  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];

  // Arreglo de colores para cada fase, según el estado actual (fase)
  let statusColors = Array(fase + 1).fill(colors[fase]);
  statusColors.push(...Array(4 - fase).fill("white"));  // Rellenar los colores faltantes hasta 4 fases

  const fetchGetStatus = async () => {
    if (fase > 0) {
      await getStatus(id, fase, setStatus);
    }
  };

  const fetchGetFase = async () => {
    await getFaseLote(id, setFase, setMaxFase);
    await fetchGetStatus();
  };

  useEffect(() => {
    fetchGetFase();
  }, []);

  useEffect(() => {
    fetchGetStatus();
  }, [reload]);

  const renderTable = () => {
    switch (fase) {
      case 1:
        return <CortesTable reload={() => setReload(!reload)} status={status} />;
      case 2:
        return <LavanderiaTable reload={() => setReload(!reload)} status={status} />;
      case 3:
        return <TallerTable reload={() => setReload(!reload)} status={status} />;
      default:
        return <Loading />;
    }
  };

  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <div>
        <div className={styles.loteIcons}>
          {[
            {
              title : "Corte",
              url : "corte"
            },
            {
              title : "Lavandería",
              url : "lavanderia"
            },
            {
              title : "Taller de Acabados Finales",
              url : "acabados"
            },
            {
              title : "Almacén",
              url : "almacen"
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
                    alt={title}  // Texto alternativo para la imagen
                  />
                </div>
              </Tooltip>
            )
          )}
        </div>
      </div>
      <Row>
        <Col span={18}>
          <Suspense fallback={<Loading />}>
            {renderTable()}
          </Suspense>
        </Col>
        <Col span={6}>
          <Status fase={fase} status={status} reload={() => setReload(!reload)} />
        </Col>
      </Row>
    </>
  );
};

export default LoteView;

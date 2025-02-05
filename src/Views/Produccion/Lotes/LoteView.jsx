import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col, Spin } from "antd";
import TimeLine from "@CP/lotes/TimeLine";
import Status from "@CP/lotes/Status";
import { getFaseLote, getStatus } from "@AP/Lote";

// Lazy load de las tablas
const CortesTable = lazy(() => import("@CP/lotes/CortesTable"));
const LavanderiaTable = lazy(() => import("@CP/lotes/LavanderiaTable"));
const TallerTable = lazy(() => import("../../../Components/produccion/lotes/AcabadoTable"));

const LoteView = () => {
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  const [fase, setFase] = useState(0);
  const [maxFase, setMaxFase] = useState(0);
  const [status, setStatus] = useState(0);

  const fetchGetStatus = async () => {
    if (fase > 0) {
      await getStatus(id, fase, setStatus);
      console.log(status);
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

  const Loading = () => <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}}><img src="/img/loading/loading.gif"/> </div>;

  const renderTable = () => {
    switch (fase) {
      case 1:
        return <CortesTable reload={() => setReload(!reload)} status={status} />;
      case 2:
        return <LavanderiaTable reload={() => setReload(!reload)} status={status} />;
      case 3:
        return <TallerTable reload={() => setReload(!reload)} status={status} />;
      default:
        return <Loading/>;
    }
  };

  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine
        fase={fase}
        setFase={setFase}
        faseTimeline={maxFase}
        reload={() => setReload(!reload)}
      />
      <Row>
        <Col span={18}>
          <Suspense fallback={<Loading/>}>
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

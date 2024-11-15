import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col } from "antd";
import CortesTable from "@CP/lotes/CortesTable";
import LavanderiaTable from "@CP/lotes/LavanderiaTable";
import TimeLine from "@CP/lotes/TimeLine";
import Status from "@CP/lotes/Status";
import { getFaseLote } from "@AP/Lote";
import { getStatusCorte } from "@AP/Corte";
import { getStatusLavanderia } from "@AP/Lavanderia";


const Lote = () => {
  const { id } = useParams();
  const [fase, setFase] = useState(0);
  const [reload, setReload] = useState(false);
  const [statusCorte, setStatusCorte] = useState(0);
  const [statusLavanderia, setStatusLavanderia] = useState(0);

  useEffect(() => {
    getFaseLote(id, setFase);
    getStatusCorte(id, setStatusCorte)
    getStatusLavanderia(id, setStatusLavanderia)
  }, [reload, id, fase]);

  let contenido;
  let status;
  if (fase == 1) {
    contenido = <CortesTable reload={reload} status={statusCorte} setReload={setReload}/>;
    status = <Status fase={fase} status={statusCorte} reload={reload} setReload={setReload}/>
  }
  else if (fase == 2) {
    contenido = <LavanderiaTable reload={reload} setReload={setReload}/>;
    status = <Status fase={fase} status={statusLavanderia} reload={reload} setReload={setReload}/>
  }
  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine fase={fase}></TimeLine>
      <Row>
        <Col span={18}>
          {contenido}
        </Col>
        <Col span={6}>
          {status}
        </Col>
      </Row>
    </>
  )
}

export default Lote
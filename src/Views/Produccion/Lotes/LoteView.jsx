import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col } from "antd";
import CortesTable from "@CP/lotes/CortesTable";
import LavanderiaTable from "@CP/lotes/LavanderiaTable";
import TimeLine from "@CP/lotes/TimeLine";
import Status from "@CP/lotes/Status";
import { getFase } from "@AP/Lote";


const Lote = () => {
  const { id } = useParams();
  const [fase, setFase] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getFase(id, setFase);
  }, [reload]);

  let contenido;
  if (fase == 1) {
    contenido = <CortesTable />;
  }
  else if (fase == 2) {
    contenido = <LavanderiaTable />;
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
          <Status reload={()=> setReload(!reload)}/>
        </Col>
      </Row>
    </>
  )
}

export default Lote
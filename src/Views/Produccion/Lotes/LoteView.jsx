import React, { useState , useEffect} from "react";
import CortesTable from "@C/Tables/CortesTable";
import LavanderiaTable from "@C/Tables/LavanderiaTable";
import TimeLine from "@C/TimeLine/TimeLine";
import Status from "@C/Status/Status";
import { getFase } from "@A/prod/lote/Lote";
import { Divider, Row, Col } from "antd";
import { useParams } from "react-router-dom";


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
  if (fase == 2) {
    contenido = <LavanderiaTable />;
  }
  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine></TimeLine>
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
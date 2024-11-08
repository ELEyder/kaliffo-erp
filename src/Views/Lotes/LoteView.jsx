import React, { useState , useEffect} from "react";
import CortesTable from "../../Components/Tables/CortesTable";
import TimeLine from "../../Components/TimeLine/TimeLine";
import Status from "../../Components/Status/Status";
import { getFase } from "../../API/Lote";
import { Divider, Row, Col } from "antd";
import { useParams } from "react-router-dom";


const Lote = () => {
  const { id } = useParams();
  const [fase, setFase] = useState(0);

  useEffect(() => {
    getFase(id, setFase);
  }, [id]);

  let contenido;
  if (fase == 1) {
    contenido = <CortesTable />;
  }
  if (fase == 2) {
    contenido = <CortesTable />;
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
          <Status/>
        </Col>
      </Row>
    </>
  )
}

export default Lote
import React from "react";
import { useParams } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import TimeLine from "./TimeLine/TimeLine";
import CorteTable from "./Tables/CorteTable";
import Status from "./Status/Status";
import { Divider, Row, Col } from "antd";
const Lote = () => {
    return(
        <Plantilla>
            <Divider>DETALLES DEL LOTE</Divider>
            <TimeLine></TimeLine>
            <Row gutter={24}>
                <Col span={16}>
                    <CorteTable/>
                </Col>
                <Col span={8}>
                    <Status/>
                </Col>
            </Row>
        </Plantilla>
    )
}

export default Lote
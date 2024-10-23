import React from "react";
import { useParams } from "react-router-dom";
import Plantilla from "../../Shared/Plantilla";
import TimeLine from "./TimeLine/TimeLine";
import CorteTable from "./Tables/CorteTable";
import Status from "./Status/Status";
import { Divider, Row, Col, FloatButton} from "antd";
const Lote = () => {
    const { id } = useParams()
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
            <FloatButton 
            style={{ insetInlineStart: 270 }}
            tooltip="Añadir Detalle"/>
        </Plantilla>
    )
}

export default Lote
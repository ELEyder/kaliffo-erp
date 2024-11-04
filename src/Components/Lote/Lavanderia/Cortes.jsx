import React from "react";
import CorteTable from "./Tables/CorteTable";
import Status from "./Status/Status";
import { Row, Col } from "antd";
const Cortes = () => {
    return(
        <>

            <Row gutter={24}>
                <Col span={16}>
                    <CorteTable/>
                </Col>
                <Col span={8}>
                    <Status/>
                </Col>
            </Row>
        </>
    )
}

export default Cortes
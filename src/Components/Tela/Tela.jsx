import React from "react";
import Plantilla from "../../Shared/Plantilla"
import TelaInfoCard from "./Cards/TelaInfoCard"
import TelasActivasTable from "./Tablas/TelasActivasTable"
import TelasInactivasTable from "./Tablas/TelasInactivasTable"
import { Col, Divider, Row, Tabs } from "antd";

const Tela = () => {
    
  const items = [
    {
      key: 'telasActivas',
      label: 'Telas Activas',
      children: <TelasActivasTable/>,
    },
    {
      key: 'telasInactivas',
      label: 'Telas Inactivas',
      children: <TelasInactivasTable />,
    },
  ];

    return (
      <Plantilla>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles de la tela
        </Divider>
        <Row  gutter={24}>
            <Col span={10}>
              <TelaInfoCard/>
            </Col>
            <Col span={12}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
      </Plantilla>
    );
  };

export default Tela
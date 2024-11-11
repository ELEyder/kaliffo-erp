import React from "react";
import { useParams } from 'react-router-dom'
import TrabajadorInfoCard from "@C/Cards/TrabajadorInfoCard";
import IncidenciasTable from "@C/Tables/IncidenciasTable";
import HorariosTable from "@C/Tables/HorariosTable"
import PagosTable from "@C/Tables/PagosTable"
import { Col, Divider, Row, Tabs } from "antd";

const Trabajador = () => {

  const items = [
    { key: '1', label: 'Incidencias', children: <IncidenciasTable/>},
    { key: '2', label: 'Horario', children: <HorariosTable/>},
    { key: '3', label: 'Pagos', children: <PagosTable/>},
  ];

    return (
      <>
        <Divider>Detalles del Usuario</Divider>
        <Row  gutter={40} style={{display: "flex", justifyContent: "center"}}>
            <Col>
              <TrabajadorInfoCard/>
              <Divider></Divider>
            </Col>
            <Col xs={24}
              sm={20}
              md={15}
              xl={12}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </>
    );
  };

export default Trabajador
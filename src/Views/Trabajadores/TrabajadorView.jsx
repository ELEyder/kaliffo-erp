import React from "react";
import { useParams } from 'react-router-dom'
import TrabajadorInfoCard from "../../Components/Cards/TrabajadorInfoCard";
import IncidenciasTable from "../../Components/Tables/IncidenciasTable";
import HorariosTable from "../../Components/Tables/HorariosTable"
import PagosTable from "../../Components/Tables/PagosTable"
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
        <Row  gutter={24}>
            <Col span={8}>
              <TrabajadorInfoCard/>
            </Col>
            <Col span={16}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </>
    );
  };

export default Trabajador
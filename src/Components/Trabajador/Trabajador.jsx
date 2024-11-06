import React from "react";
import { useParams } from 'react-router-dom'
import Plantilla from "../../Shared/Plantilla"
import TrabajadorInfoCard from "./Cards/TrabajadorInfoCard";
import TablaIncidencias from "./Tablas/TablaIncidencias";
import TablaHorario from "./Tablas/TablaHorario"
import TablaPagos from "./Tablas/TablaPagos"
import { Col, Divider, Row, Tabs } from "antd";
// import TrabajadorLista from "./Cards/TrabajadorListaCard";

const Trabajador = () => {
  const { id } = useParams();

  const items = [
    {
      key: '1',
      label: 'Incidencias',
      children: <TablaIncidencias id={ id }/>,
    },
    {
      key: '2',
      label: 'Horario',
      children: <TablaHorario id={ id }/>,
    },
    {
      key: '3',
      label: 'Pagos',
      children: <TablaPagos id={ id }/>,
    },
  ];

    return (
      <Plantilla>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles del Trabajador
        </Divider>
        <Row  gutter={24}>
            <Col span={8}>
              <TrabajadorInfoCard/>
              <Divider></Divider>
              {/* TrabajadorInfoCard/ */}
            </Col>
            <Col span={16}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
        <Divider></Divider>
      </Plantilla>
    );
  };

export default Trabajador
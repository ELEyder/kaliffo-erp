import React from "react";
import TrabajadorInfoCard from "@C/Cards/TrabajadorInfoCard";
import IncidenciasTable from "@C/Tables/IncidenciasTable";
import HorariosTable from "@C/Tables/HorariosTable"
import PagosTable from "@C/Tables/PagosTable"
import { Divider, Tabs, Flex } from "antd";

const Trabajador = () => {

  const items = [
    { key: 'Incidencias', label: 'Incidencias', children: <IncidenciasTable/>},
    { key: 'Horario', label: 'Horario', children: <HorariosTable/>},
    { key: 'Pagos', label: 'Pagos', children: <PagosTable/>},
  ];

    return (
      <>
        <Divider>Detalles del Usuario</Divider>
        <Flex wrap gap="small" vertical={false} justify={'space-evenly'} align="flex-start">
          <TrabajadorInfoCard/>
          <Tabs defaultActiveKey="1" items={items} />
        </Flex>
        <Divider></Divider>
      </>
    );
  };

export default Trabajador
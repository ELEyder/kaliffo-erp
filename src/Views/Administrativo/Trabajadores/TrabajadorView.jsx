import React from "react";
import TrabajadorInfoCard from "@CA/trabajadores/TrabajadorInfoCard";
import IncidenciasTable from "@CA/trabajadores/IncidenciasTable";
import HorariosTable from "@CA/trabajadores/HorariosTable"
import PagosTable from "@CA/trabajadores/PagosTable"
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
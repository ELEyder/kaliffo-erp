import React from "react";
import TrabajadorInfoCard from "@CA/trabajadores/TrabajadorInfoCard";
import IncidenciasTable from "@CA/trabajadores/IncidenciasTable";
import HorariosTable from "@CA/trabajadores/HorariosTable";
import PagosTable from "@CA/trabajadores/PagosTable";
import { Divider, Tabs, Flex } from "antd";

const Trabajador = () => {
  const items = [
    {
      key: "Incidencias",
      label: "Incidencias",
      children: <IncidenciasTable />,
    },
    { key: "Horario", label: "Horario", children: <HorariosTable /> },
    { key: "Pagos", label: "Pagos", children: <PagosTable /> },
  ];

  return (
    <>
      <Divider>Detalles del Usuario</Divider>
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto", 
          padding: "1rem",
        }}
      >
        <TrabajadorInfoCard
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
        />
        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
        />
      </Flex>

      <Divider></Divider>
    </>
  );
};

export default Trabajador;

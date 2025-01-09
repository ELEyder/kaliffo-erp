import React from "react";
import TrabajadorInfoCard from "@CA/trabajadores/TrabajadorInfoCard";
import IncidenciasTable from "@CA/trabajadores/IncidenciasTable";
import HorariosTable from "@CA/trabajadores/HorariosTable";
import PagosTable from "@CA/trabajadores/PagosTable";
import { Divider, Tabs, Flex } from "antd";

const Trabajador = () => {
  // Definición de las pestañas que se mostrarán
  const items = [
    {
      key: "Incidencias",
      label: "Incidencias",
      children: <IncidenciasTable />, // Componente que muestra las incidencias
    },
    // { key: "Horario", label: "Horario", children: <HorariosTable /> }, // Componente que muestra los horarios
    { key: "Pagos", label: "Pagos", children: <PagosTable /> }, // Componente que muestra los pagos
  ];

  return (
    <>
      <Divider>Detalles del Usuario</Divider> {/* Título de la sección */}
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px", // Máxima anchura del contenedor
          margin: "0 auto", // Centrado horizontal
          padding: "1rem", // Espaciado interno
        }}
      >
        {/* Tarjeta de información del trabajador */}
        <TrabajadorInfoCard
          style={{
            flex: "1 1 45%",
            minWidth: "400px", // Ancho mínimo
            maxWidth: "700px", // Ancho máximo
          }}
        />
        {/* Pestañas que contienen las tablas de incidencias, horarios y pagos */}
        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
        />
      </Flex>

      <Divider></Divider> {/* Separador al final */}
    </>
  );
};

export default Trabajador;

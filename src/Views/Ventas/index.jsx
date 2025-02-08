import React from "react";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import VentasTipoTable from "@CA/ventas/VentasTipoTable"; // Componente que muestra la tabla de ventas por tipo
import { Divider } from "antd"; // Componente de Ant Design para crear divisores

const VentasView = () => {
  
  // Obtención del parámetro 'tipo' desde la URL
  const { tipo } = useParams();

  return (
    <>
      {/* Título de la sección que se convierte en mayúsculas */}
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>
      {/* Componente que muestra la tabla de ventas filtrada por tipo */}
      <VentasTipoTable />
    </>
  );
};

export default VentasView;

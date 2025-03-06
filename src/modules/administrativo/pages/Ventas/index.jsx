import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import { Divider } from "antd"; // Componente de Ant Design para crear divisores
import VentasPorTipoTable from "../../components/Tables/VentasPorTipoTable";

const VentasView = () => {
  
  const { tipo } = useParams();

  const [ modal, setModal] = useState(true)

  return (
    <>
      <Divider style={{textTransform: "uppercase"}}> {tipo} </Divider>

      <VentasPorTipoTable tipo={tipo}/>
    </>
  );
};

export default VentasView;

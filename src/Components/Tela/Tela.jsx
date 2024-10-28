import React from "react";
import Plantilla from "../../Shared/Plantilla"
import TelasActivasTable from "./Tablas/TelasActivasTable"
import TelasInactivasTable from "./Tablas/TelasInactivasTable"
import { Divider, Tabs } from "antd";

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
        <Tabs defaultActiveKey="1" items={items} />
      </Plantilla>
    );
  };

export default Tela
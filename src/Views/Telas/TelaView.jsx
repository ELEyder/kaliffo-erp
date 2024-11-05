import React from "react";
import TelasActivasTable from "../../Components/Tables/TelasActivasTable"
import TelasInactivasTable from "../../Components/Tables/TelasInactivasTable"
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
      <>
        <Divider style={{textTransform: "uppercase"}}>
          Detalles de la tela
        </Divider>
        <Tabs defaultActiveKey="1" items={items} />
      </>
    );
  };

export default Tela
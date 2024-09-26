import { Tabs } from "antd";
import React from "react";
import TablaIncidencias from "./Tablas/TablaIncidencias";
import TablaHorario from "./Tablas/TablaHorario"
import TablaPagos from "./Tablas/TablaPagos"
import { useParams } from 'react-router-dom'



const TrabajadorContenidoMain = () =>{
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
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default TrabajadorContenidoMain
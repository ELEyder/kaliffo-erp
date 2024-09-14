import { Table } from "antd";
import React from "react";

const columns=[
    {
        title:"Nombre"
    },
    {
        title:"DNI"
    },
    {
        title:"Telefono"
    },
    {
        title:"OPciones"
    }
]

const TiendaPersonal = () =>{
    return(
        <>
            <Table columns={columns}></Table>
        </>
    )
}

export default TiendaPersonal
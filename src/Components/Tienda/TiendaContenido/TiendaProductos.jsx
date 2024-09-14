import { Table } from "antd";
import React from "react";

const columns=[
    {
        title:"Producto"
    },
    {
        title:"Stock"
    },
    {
        title:"Precio"
    },
    {
        title:"Detalle"
    },
    {
        title:"Opciones"
    }
]

const TiendaProductos = () =>{
    return(
       <>
         <Table
        columns={columns}></Table>
       </>
    )
}

export default TiendaProductos
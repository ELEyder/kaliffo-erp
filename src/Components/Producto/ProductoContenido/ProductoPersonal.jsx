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

const ProductoPersonal = () =>{
    return(
        <>
            <Table columns={columns}></Table>
        </>
    )
}

export default ProductoPersonal
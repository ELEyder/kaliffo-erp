import { Table } from "antd";
import React from "react";

const columns=[
    {
        title:"Colores"
    },
    {
        title:"Stock"
    },
    {
        title:"Ver más"
    },
    {
        title:"Opciones"
    }
]

const ProductoColores = () =>{
    return(
        <>
            <Table columns={columns}></Table>
        </>
    )
}

export default ProductoColores
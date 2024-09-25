import { Table } from "antd";
import React from "react";

const columns=[
    {
        title:"Talla"
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

const ProductoTallas = () =>{
    return(
        <>
            <Table columns={columns}></Table>
        </>
    )
}

export default ProductoTallas
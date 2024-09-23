import { Table } from "antd";
import React from "react";

const columns=[
    {
        title:"Tienda"
    },
    {
        title:"Stock"
    },
    {
        title:"Precio"
    },
    {
        title:"Ver más"
    },
    {
        title:"Opciones"
    }
]

const ProductoTiendas = () =>{
    return(
       <>
         <Table
        columns={columns}></Table>
       </>
    )
}

export default ProductoTiendas
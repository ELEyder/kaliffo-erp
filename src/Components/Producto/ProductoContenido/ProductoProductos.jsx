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

const ProductoProductos = () =>{
    return(
       <>
         <Table
        columns={columns}></Table>
       </>
    )
}

export default ProductoProductos
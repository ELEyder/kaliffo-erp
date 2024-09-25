import { Table } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getProductoById, getProductoTiendas } from "../../../../Shared/Funciones/Funciones_Producto";

const ProductoTiendas = ({ id }) =>{
    const columns=[
        {
            title: "Tienda",
            dataIndex: "tienda",
            key: "tienda",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Precio",
            dataIndex: "precio",
            key: "precio",
        },
        {
            title: "Ver más",
            render: (text, record) => <a href={`/tienda/${record.id}`}>Ver más</a>,
            key: "verMas",
        },
        {
            title: "Opciones",
            render: (text, record) => <button>Opciones</button>,
            key: "opciones",
        },
    ]


    const [user, setUser] = useState();
    const [tabla, setTabla] = useState();

    useEffect(() => {
        getProductoById(id , setUser);
        getProductoTiendas(id , setTabla);
      }, [id]);

    return(
       <>
         <Table
        columns={columns}
        dataSource={tabla}
        >

        </Table>
       </>
    )
}

export default ProductoTiendas
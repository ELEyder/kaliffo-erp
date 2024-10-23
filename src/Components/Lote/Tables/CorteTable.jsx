import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCorte } from "../../../Shared/api/Corte";

const CorteTable = () => {
    const { id } = useParams()
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{ 
        getCorte(id, setData)
    }, [id,reload])
    const columns = [
        {
            key: 'taller',
            dataIndex: 'taller',
            title: 'Taller',
        },
        {
            key: 'producto',
            dataIndex: 'producto',
            title: 'Producto',
        },
        {
            key: 'cantidad',
            dataIndex: 'cantidad',
            title: 'Cantidad',
        },
        {
            key: 'talla',
            dataIndex: 'talla',
            title: 'Talla',
        },
        {
            key: 'tela',
            dataIndex: 'tela',
            title: 'Tela',
        },
        {
            key: 'metraje',
            dataIndex: 'metraje',
            title: 'Metraje',
        },
        {
            key: 'neto',
            dataIndex: 'neto',
            title: 'Neto',
        },
    ]

    return(
        <Table dataSource={data} columns={columns}/>
    )
}

export default CorteTable
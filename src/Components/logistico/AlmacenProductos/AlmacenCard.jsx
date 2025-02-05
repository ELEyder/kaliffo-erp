import { Button, Card, List,Typography } from "antd";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import {getAlmacenProducto} from "@AL/AlmacenProductos"

const { Paragraph, Text } = Typography;
const AlmacenCard = () =>{
    const {id} = useParams();
    const [almacen,setAlmacen] = useState([]);

    useEffect(()=>{
        getAlmacenProducto(id,setAlmacen)
    },[id])

    return(
        <Card
        style={{ width: 300, textAlign: "center" }}
        title={almacen.nombre_almacen}
        actions={[
            <Button
            block
            style={{fontWeight:"bold"}}>
                Obtener Reporte
            </Button>
        ]}>
            <List
            itemLayout="horizontal"
            dataSource={[
                {
                    title:"Direccion",
                    value:almacen.direccion === null ? "N/A" : `${almacen.direccion}`
                },
                {
                    title:"Stock",
                    value:almacen.stock_total === null ? "0" : `${almacen.stock_total}`
                }
            ]} 
            renderItem={(
                item
            )=>(
                <List.Item>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <strong>{item.title}:</strong>
                        <Paragraph>{item.value}</Paragraph>
                    </div>
                </List.Item>
            )}/>
        </Card>
    )

}

export default AlmacenCard;
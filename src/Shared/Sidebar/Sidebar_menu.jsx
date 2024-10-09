import React,{useState} from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {BookOutlined,UserOutlined,CoffeeOutlined,HarmonyOSOutlined} from '@ant-design/icons';

const Items=[
    {
        key:"sub1",
        label:"Trabajadores",
        icon:<BookOutlined /> ,
        children:[
            {
                key:"1",
                icon:<UserOutlined />,
                label:(
                    <Link to="/trabajadores/ventas" style={{textDecoration:"none"}}>Vendedores</Link>
                ),
            },
            {
                key:"2",
                icon:<UserOutlined /> ,
                label:(
                    <Link to="/trabajadores/talleres" style={{textDecoration:"none"}}>Talleres</Link>
                ),
            },
            {
                key:"3",
                icon:<UserOutlined /> ,
                label:(
                    <Link to="/trabajadores/miscelaneos" style={{textDecoration:"none"}}>Miscelaneos</Link>
                ),
            },
            {
                key:"4",
                icon:<UserOutlined /> ,
                label:(
                    <Link to="/trabajadores/costureros" style={{textDecoration:"none"}}>Costureros</Link>
                ),
            }
        ]
    },
    {
        key:"sub2",
        icon:<HarmonyOSOutlined />,
        label:(<Link to={"/tiendas"} style={{textDecoration:"none"}} >Tiendas</Link>)
    },
    {
        key:"sub4",
        icon:<CoffeeOutlined/>,
        label:(<Link to={"/productos"} style={{textDecoration:"none"}} >Productos</Link>)
    },
    {
        key:"sub5",
        label:"Ventas",
        icon:<BookOutlined /> ,
        children:[
            {
                key:"5",
                icon:<UserOutlined />,
                label:(
                    <Link to="/ventas/boleta" style={{textDecoration:"none"}}>Boletas</Link>
                ),
            },
            {
                key:"6",
                icon:<UserOutlined />,
                label:(
                    <Link to="/ventas/factura" style={{textDecoration:"none"}}>Facturas</Link>
                ),
            },
        ]
    }

    
]

const Sidebar_menu = () =>{

    return(
        <Menu
            mode="inline"
            theme="dark"
            items={Items}
        />
    )
}

export default Sidebar_menu
import React,{useState} from "react";
import { Divider, Menu } from "antd";
import { Link } from "react-router-dom";
import {BookOutlined,UserOutlined,CoffeeOutlined,HarmonyOSOutlined} from '@ant-design/icons';

const Items=[
    {
        label:<div style={{color:"white", alignItems: "end", fontWeight: "500", fontSize:"16px"}}>ADMINISTRATIVO</div>
    },
    {
        key:"sub1",
        label:"Trabajadores",
        icon:<BookOutlined /> ,
        children:[
            {
                key:"1",
                icon:<UserOutlined />,
                label:(
                    <Link to="/trabajadores/tipo/ventas" style={{textDecoration:"none"}}>Vendedores</Link>
                ),
            },
            {
                key:"2",
                icon:<UserOutlined /> ,
                label:(
                    <Link to="/trabajadores/tipo/talleres" style={{textDecoration:"none"}}>Talleres</Link>
                ),
            },
            {
                key:"3",
                icon:<UserOutlined /> ,
                label:(
                    <Link to="/trabajadores/tipo/miscelaneos" style={{textDecoration:"none"}}>Miscelaneos</Link>
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
    },
    {
        label:<div style={{color:"white", alignItems: "end", fontWeight: "500", fontSize:"16px"}}>LOGÍSTICO</div>
    },
    {
        key:"sub6",
        label:"Mover Mercaderia",
        icon:<BookOutlined /> ,
        children:[
            {
                key:"7",
                icon:<UserOutlined />,
                label:(
                    <Link to="/ventas/boleta" style={{textDecoration:"none"}}>Mover Mercaderia</Link>
                ),
            },
            {
                key:"8",
                icon:<UserOutlined />,
                label:(
                    <Link to="/ventas/factura" style={{textDecoration:"none"}}>Historial</Link>
                ),
            },
        ]
    },
    {
        icon:<CoffeeOutlined/>,
        label:(<Link to={"/compras"} style={{textDecoration:"none"}} >Compras</Link>)
    },
    {

        label:<div style={{color:"white", alignItems: "end", fontWeight: "500", fontSize:"16px"}}>PRODUCCIÓN</div>
    },
    {
        key:"sub7",
        label:(<Link to={"/almacen/telas"} style={{textDecoration:"none"}} >Almacen de Telas</Link>),
        icon:<BookOutlined /> ,
    },
    {
        key:"lotes",
        label:(<Link to={"/lotes"} style={{textDecoration:"none"}} >Lotes</Link>),
        icon:<BookOutlined /> ,
    },
    
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
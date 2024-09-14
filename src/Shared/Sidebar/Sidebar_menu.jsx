import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {BookOutlined,UserOutlined} from '@ant-design/icons';

const Items=[
    {
        key:"sub1",
        label:(<span><BookOutlined />  Trabajadores</span>),
        children:[
            {
                key:"1",
                label:(
                    <Link to="/trabajadores/ventas" style={{textDecoration:"none"}}><UserOutlined /> Vendedores</Link>
                ),
            },
            {
                key:"1",
                label:(
                    <Link to="/trabajadores/ventas" style={{textDecoration:"none"}}><UserOutlined /> Vendedores</Link>
                ),
            },
            {
                key:"1",
                label:(
                    <Link to="/trabajadores/ventas" style={{textDecoration:"none"}}><UserOutlined /> Vendedores</Link>
                ),
            },
            {
                key:"2",
                label:(
                    <a href="/trabajadores/ventas">Costureros</a>
                ),
            }
        ]
    },
    {
        key:"sub3",
        label:(<Link to={"/tiendas"}>Tiendas</Link>)
    }

    
]

const Sidebar_menu = () =>{
    return(
        <Menu mode="inline" theme="dark"
        items={Items}></Menu>
    )
}

export default Sidebar_menu
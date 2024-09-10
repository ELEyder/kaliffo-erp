import React from "react";
import { Menu } from "antd";

const Items=[
    {
        key:"sub1",
        label:"Trabajadores",
        children:[
            {
                key:"1",
                label:(
                    <a href="/trabajadores/ventas">Vendedores</a>
                ),
            },
            {
                key:"2",
                label:(
                    <a href="/trabajadores/ventas">Costureros</a>
                ),
            }
        ]
    }
]

const Sidebar_menu = () =>{
    return(
        <Menu mode="inline" theme="dark"
        items={Items}></Menu>
    )
}

export default Sidebar_menu
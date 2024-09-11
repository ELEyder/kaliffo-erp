import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Items=[
    {
        key:"sub1",
        label:"Trabajadores",
        children:[
            {
                key:"1",
                label:(
                    <Link to="/trabajadores/ventas">Vendedores</Link>
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
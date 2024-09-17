import React,{useState} from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {BookOutlined,UserOutlined,CoffeeOutlined} from '@ant-design/icons';

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
            }
        ]
    },
    {
        key:"sub3",
        icon:<CoffeeOutlined />,
        label:(<Link to={"/tiendas"}>Tiendas</Link>)
    }

    
]

const Sidebar_menu = () =>{
    
    const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

    return(
        <Menu mode="inline" theme="dark"
        items={Items} inlineCollapsed={collapsed}></Menu>
    )
}

export default Sidebar_menu
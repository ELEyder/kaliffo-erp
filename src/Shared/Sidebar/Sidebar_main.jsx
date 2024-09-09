import React from "react";
import Sider from "antd/es/layout/Sider";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from '@ant-design/icons';
import Typography from "antd/es/typography/Typography";
import Sidebar_menu from "./Sidebar_menu";

const{Title,Text}=Typography

const Sidebar_main = () => {
  return (
    <Sider
      width={200}
      style={{ background: "#162b4e", textAlign:"center"}}
      breakpoint="lg"
      collapsedWidth="0"
    >  
        <Avatar size={64} icon={<UserOutlined/>}/>
        <Title level={4} style={{color:"white"}}>Tienda 1</Title>
        <Sidebar_menu/>
    </Sider>
  );
};

export default Sidebar_main;

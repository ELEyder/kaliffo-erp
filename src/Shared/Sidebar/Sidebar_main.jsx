import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Sidebar_menu from "./Sidebar_menu";

const { Sider } = Layout;
const { Title } =Typography


const Sidebar_main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [icon, setIcon] = useState(<LeftOutlined />);
  const [style, setStyle] = useState({ position: 'absolute', top: '16px', left: '216px', transition: 'ease 0.2s'});

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setIcon(collapsed ? <LeftOutlined /> : <RightOutlined />);
    setStyle(prevStyle => ({
      ...prevStyle,
      left: collapsed ? '216px' : '16px'
    }));
  };

  return (
    <>
    <Sider
      width={200}
      style={{ background: "#162b4e", textAlign: "center" }}
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={collapsed} // Controla el colapso aquí
    >
      <Avatar size={64} icon={<UserOutlined />} />
      <Title level={4} style={{ color: "white" }}>Tienda 1</Title>
      <Sidebar_menu/>

    </Sider>
      <FloatButton onClick={toggleCollapsed} style={style}
      icon = {icon}/>
    </>

  );
};

export default Sidebar_main;



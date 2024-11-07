import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Sidebar_menu from "./SidebarOptions";

const { Sider } = Layout;
const { Title } =Typography


const Sidebar_main = () => {
  return (
    <>
    <link rel="stylesheet" href="/css/shared/sidebar.css"/>
    <Sider
      width={250}
      breakpoint="lg"
      className="sidebar"
      collapsedWidth="0"
    >
      <div className="sidebar-header">
        <Avatar size={64} icon={<UserOutlined />} />
        <Title level={4} >Tienda 1</Title>
      </div>
      <Sidebar_menu/>

    </Sider>

    </>

  );
};

export default Sidebar_main;



import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Menu from "./Menu";
import "@/assets/css/shared/sidebar.css"

const { Sider } = Layout;
const { Title } =Typography


const Sidebar_main = ({collapsed}) => {
  return (

    <>
      <Sider style={{ height: '100vh', overflowY: 'scroll', padding: '0'}} trigger={null} collapsible collapsed={collapsed}
      width={250}
      breakpoint="lg"
      className="sidebar"
      collapsedWidth="0"
    >
      <div className="sidebar-header">
        {/* <Avatar size={64} icon={<UserOutlined />} />
        <Title level={4} >Tienda 1</Title> */}
      </div>
      <Menu/>
    </Sider>

    </>

  );
};

export default Sidebar_main;



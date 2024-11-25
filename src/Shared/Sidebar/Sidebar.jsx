import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Menu from "./Menu";
import styles from './Sidebar.module.css'

const { Sider } = Layout;
const { Title } =Typography


const Sidebar = ({collapsed}) => {
  return (

    <>
      <Sider style={{ height: '100vh', overflowY: 'scroll', padding: '0'}} trigger={null} collapsible collapsed={collapsed}
      width={250}
      breakpoint="lg"
      className="sidebar"
      collapsedWidth="0"
    >
      <div className={styles.sidebarHeader}>
        {/* <Avatar size={64} icon={<UserOutlined />} />
        <Title level={4} >Tienda 1</Title> */}
        <h1>Administrador</h1>
      </div>
      <Menu/>
    </Sider>

    </>

  );
};

export default Sidebar;



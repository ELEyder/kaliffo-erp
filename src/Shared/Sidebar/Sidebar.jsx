import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Menu from "./Menu";
import styles from './Sidebar.module.css'
import { useSession } from "../../context/AuthProvider";

const { Sider } = Layout;
const { Title } =Typography


const Sidebar = ({collapsed}) => {
  const { user, login, logout } = useSession();

  return (

    <>
      <Sider style={{ height: '100vh', overflowY: 'scroll', padding: '0'}} trigger={null} collapsible collapsed={collapsed}
      width={250}
      breakpoint="lg"
      className="sidebar"
      collapsedWidth="0"
    >
      <div className={styles.sidebarHeader}>
        <h1>{user.rol}</h1>
      </div>
      <Menu/>
    </Sider>

    </>

  );
};

export default Sidebar;



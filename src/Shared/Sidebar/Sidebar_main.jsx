import React, { useState } from "react";
import { UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Layout, Avatar, Typography, FloatButton } from 'antd';
import Sidebar_menu from "./Sidebar_menu";

const { Sider } = Layout;
const { Title } =Typography


const Sidebar_main = () => {
  return (
    <>
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div style={{ background: "#162b4e", textAlign: "center" }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Title level={4} style={{ color: "white" }}>Tienda 1</Title>
      </div>
      <Sidebar_menu/>

    </Sider>

    </>

  );
};

export default Sidebar_main;



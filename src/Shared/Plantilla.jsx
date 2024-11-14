import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import Header_main from "./Header/Header_main";
import Footer_main from "./Footer/Footer_main";

const { Content } = Layout;

const Plantilla = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout>
        <Header_main collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content style={{ padding: "0 24px", height: 'calc(100vh - 64px - 70px)', overflowY: 'auto' }}>
          <Outlet />
        </Content>
        <Footer_main />
      </Layout>
    </Layout>
  );
};

export default Plantilla;
import React from "react";
import { Outlet } from 'react-router-dom';
import { Layout } from "antd";
import Sidebar_main from "./Sidebar/Sidebar";
import Header_main from "./Header/Header_main";
import Footer_main from "./Footer/Footer_main";

const { Content } = Layout;

const Plantilla = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar_main />
      <Layout>
        <Header_main />
        <Content style={{ padding: "0 24px", height: 'calc(100vh - 64px - 70px)', overflowY: 'auto' }}>
          <Outlet />
        </Content>
        <Footer_main />
      </Layout>
    </Layout>
  );
};

export default Plantilla;
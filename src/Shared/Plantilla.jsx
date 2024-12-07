import React, { useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import HeaderMain from "./Header/HeaderMain";
import Footer_main from "./Footer/Footer_main";
import { useSession } from "../context/AuthProvider";

const { Content } = Layout;

const Plantilla = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSession();

  return ( user ?
    <Layout style={{ height: "100vh" }}>
      <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout>
        <HeaderMain collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content style={{ padding: "0 24px", height: 'calc(100vh - 64px - 70px)', overflowY: 'auto' }}>
          <Outlet />
        </Content>
        <Footer_main />
      </Layout>
    </Layout> :
    <Navigate to="/"/>
  );
};

export default Plantilla;
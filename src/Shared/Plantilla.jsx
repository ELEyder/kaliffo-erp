import React from "react";
import { Flex, Layout } from "antd";
import Sidebar_main from "./Sidebar/Sidebar";
import Header_main from "./Header/Header_main";
import PropTypes from "prop-types";
import Footer_main from "./Footer/Footer_main";


const { Content } = Layout;

const Plantilla = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar_main />
      <Layout>
        <Header_main />
        <Content style={{ padding: "0 24px", minHeight: 280, height: 'calc(100vh - 64px - 70px)', overflowY: 'auto'}}>
          {children}
        </Content>
        <Footer_main />
      </Layout>
    </Layout>
  );
};


Plantilla.propTypes = {
    children: PropTypes.node,
};

export default Plantilla;

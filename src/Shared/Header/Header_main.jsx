import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import "@/assets/css/shared/header.css"

const Header_main = ({collapsed, setCollapsed}) => {
  return (
    <>
      <Header>
      <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        <Title>Kaliffo ERP</Title>
      </Header>
    </>
  )
}

export default Header_main
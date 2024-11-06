import React from "react";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

const Header_main = () => {
  return (
    <>
      <link rel="stylesheet" href="/css/shared/header.css" />
      <Header>
        <Title>Kaliffo ERP</Title>
      </Header>
    </>
  )
}

export default Header_main
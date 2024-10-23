import React from "react";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import Title from "antd/es/typography/Title";

const Header_main =() =>{
    return(
        <Header style={{ padding: 0, background: '#d1deee', textAlign:"center" }}>
            <Title style={{marginTop:5}}>KALIFFO ERP</Title>
          </Header>
    )
}

export default Header_main
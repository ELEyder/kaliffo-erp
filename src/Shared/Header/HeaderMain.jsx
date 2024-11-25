import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import styles from './HeaderMain.module.css'

const HeaderMain = ({collapsed, setCollapsed}) => {
  return (
    <>
      <Header>
        <div className={styles.header}>
          <Button
              type="text"
              className={styles.buttonSidebar}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          <h1 className={styles.title}>Kaliffo</h1>
        </div>
      </Header>
    </>
  )
}

export default HeaderMain
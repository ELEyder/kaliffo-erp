import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import styles from './HeaderMain.module.css'
import { useSession } from "../../context/AuthProvider";

const HeaderMain = ({collapsed, setCollapsed}) => {
  const { logout } = useSession();
  
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
          <Button
              type="text"
              className={styles.buttonSidebar}
              icon={<LogoutOutlined />}
              onClick={() => {
                logout()
                navigate
              }}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
        </div>
      </Header>
    </>
  )
}

export default HeaderMain
import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import styles from './HeaderMain.module.css';
import { useSession } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const HeaderMain = ({ collapsed, setCollapsed }) => {
  const { logout } = useSession();
  const navigate = useNavigate(); // Inicializar el hook de navegación

  return (
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
            logout();
            navigate('/'); // Redirige al usuario a la página principal (u otra página)
          }}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </div>
    </Header>
  );
}

export default HeaderMain;

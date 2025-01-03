import React from "react";
import { Button } from "antd"; // Importación del botón de Ant Design
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons'; // Iconos de Ant Design
import { Header } from "antd/es/layout/layout"; // Importación del componente Header de Ant Design
import styles from './HeaderMain.module.css'; // Estilos específicos para este componente
import { useSession } from "../../context/AuthProvider"; // Hook de autenticación para manejar el estado de la sesión
import { useNavigate } from "react-router-dom"; // Hook para redirigir a otras rutas

const HeaderMain = ({ collapsed, setCollapsed }) => {
  const { logout } = useSession(); // Función para cerrar sesión
  const navigate = useNavigate(); // Hook para manejar la navegación

  return (
    <Header>
      <div className={styles.header}>
        {/* Botón para alternar la visibilidad de la barra lateral */}
        <Button
          type="text"
          className={styles.buttonSidebar}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)} // Alterna el estado de colapso
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <h1 className={styles.title}>Kaliffo</h1> {/* Título de la aplicación */}

        {/* Botón para cerrar sesión */}
        <Button
          type="text"
          className={styles.buttonSidebar}
          icon={<LogoutOutlined />}
          onClick={() => {
            logout(); // Llama a la función de logout
            navigate('/'); // Redirige a la página de inicio
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

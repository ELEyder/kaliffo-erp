import { Layout } from 'antd';
import Menu from "./Menu"; // Componente de menú
import styles from './Sidebar.module.css' // Estilos CSS para el Sidebar
import { useSession } from "../../../context/AuthProvider"; // Hook para acceder al estado de sesión

const { Sider } = Layout; // Usamos el componente Sider de Ant Design para el sidebar

const Sidebar = ({ collapsed }) => {
  const { user, login, logout } = useSession(); // Extraemos los datos del usuario y funciones de login/logout desde el contexto

  return (
    <>
      {/* Sidebar usando el componente Sider de Ant Design */}
      <Sider
        className={styles.sidebar} // Estilo de la altura y el scroll
        trigger={null} // Desactivamos el trigger para colapsar
        collapsible // Hace que el sidebar sea colapsable
        collapsed={collapsed} // Determina si el sidebar está colapsado o no
        width={250} // Establece el ancho cuando el sidebar no está colapsado
        breakpoint="lg" // Define el tamaño para el punto de ruptura (cuando cambia el layout)
        collapsedWidth="0" // Establece el ancho cuando el sidebar está colapsado
      >
        {/* Cabecera del Sidebar */}
        <div className={styles.sidebarHeader}>
          {/* Mostrar el rol del usuario autenticado */}
          <h1>{user.rol}</h1>
        </div>

        {/* Renderiza el componente Menu con los elementos de navegación */}
        <Menu />
      </Sider>
    </>
  );
};

export default Sidebar;

import { Layout } from 'antd';
import { useSession } from "../../../context/AuthProvider"; // Hook para acceder al estado de sesión
import SidebarMenu from "./SidebarMenu"; // Componente de menú

import styles from './index.module.css' // Estilos CSS para el Sidebar

const { Sider } = Layout; // Usamos el componente Sider de Ant Design para el sidebar

const Sidebar = ({ collapsed }) => {
  const { user } = useSession(); // Extraemos los datos del usuario y funciones de login/logout desde el contexto

  return (
    <>
      <Sider
        className={styles.sidebar} // Estilo de la altura y el scroll
        trigger={null} // Desactivamos el trigger para colapsar
        collapsible // Hace que el sidebar sea colapsable
        collapsed={collapsed} // Determina si el sidebar está colapsado o no
        width={250} // Establece el ancho cuando el sidebar no está colapsado
        breakpoint="lg" // Define el tamaño para el punto de ruptura (cuando cambia el layout)
        collapsedWidth="0" // Establece el ancho cuando el sidebar está colapsado
      >

        <SidebarMenu rol={user.rol} />

      </Sider>
    </>
  );
};

export default Sidebar;

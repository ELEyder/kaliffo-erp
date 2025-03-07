import React, { useState } from "react"; // Importamos React y useState para manejar el estado
import { Navigate, Outlet } from "react-router-dom"; // Importamos Navigate y Outlet para manejar la navegación y el renderizado de rutas secundarias
import { Layout as LayoutAnt } from "antd"; // Importamos Layout de Ant Design
import { Sidebar, Header, Footer } from "../../components/UI"; // Importamos los componentes Sidebar, Header y Footer
import { useSession } from "../../context/AuthProvider"; // Importamos el hook useSession para acceder a los datos de sesión del usuario

import styles from "./index.module.css";
const { Content } = LayoutAnt; // Desestructuramos Content de Layout

const Layout = () => {
  // Estado para manejar el colapso del Sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Extraemos el objeto de usuario desde el contexto de sesión
  const { user } = useSession();
  // Lista de roles permitidos para acceder a la plantilla
  const usernames = ["administrador", "venta", "produccion"];

  return user && usernames.includes(user.rol ?? "") ? (
    <main className={styles.main}>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <LayoutAnt>
        <Sidebar collapsed={collapsed} />
        <LayoutAnt className={styles.content}>
          <Content className={styles.son}>
            <Outlet />
          </Content>
          <Footer />
        </LayoutAnt>
      </LayoutAnt>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Layout;

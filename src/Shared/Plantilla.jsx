import React, { useState } from "react"; // Importamos React y useState para manejar el estado
import { Navigate, Outlet } from 'react-router-dom'; // Importamos Navigate y Outlet para manejar la navegación y el renderizado de rutas secundarias
import { Layout } from "antd"; // Importamos Layout de Ant Design
import Sidebar from "./Sidebar/Sidebar"; // Importamos el componente Sidebar
import HeaderMain from "./Header/HeaderMain"; // Importamos el componente HeaderMain
import FooterMain from "./Footer/FooterMain"; // Importamos el componente Footer_main
import { useSession } from "../context/AuthProvider"; // Importamos el hook useSession para acceder a los datos de sesión del usuario

const { Content } = Layout; // Desestructuramos Content de Layout

const Plantilla = () => {
  // Estado para manejar el colapso del Sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Extraemos el objeto de usuario desde el contexto de sesión
  const { user } = useSession();
  // Lista de roles permitidos para acceder a la plantilla
  const usernames = ["administrador", "venta", "produccion"];
  
  // Si el usuario está autenticado y tiene un rol permitido, renderizamos la plantilla
  return (user && usernames.includes(user.rol ?? '')) ? (
    <Layout style={{ height: "100vh" }}> {/* Layout principal con altura de pantalla completa */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> {/* Sidebar */}
      <Layout>
        <HeaderMain collapsed={collapsed} setCollapsed={setCollapsed} /> {/* Header */}
        <Content style={{ padding: "0 24px", height: 'calc(100vh - 64px - 70px)', overflowY: 'auto' }}>
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </Content>
        <FooterMain /> {/* Footer */}
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/" /> // Si el usuario no está autorizado, redirigimos al home
  );
};

export default Plantilla;

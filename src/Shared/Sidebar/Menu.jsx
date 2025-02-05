import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { BookOutlined, UserOutlined, CoffeeOutlined, HarmonyOSOutlined } from "@ant-design/icons";
import { useSession } from "../../context/AuthProvider"; // Hook para obtener información del usuario autenticado

const SidebarMenu = () => {
  const { user } = useSession(); // Obtiene el usuario autenticado desde el contexto

  // Función que filtra los elementos del menú según el rol del usuario
  const filterMenuItemsByRole = (items) => {
    const rolePermissions = {
      administrador: () => true, // Los administradores tienen acceso a todo
      venta: (key) =>
        // Rol de "venta" tiene acceso a estos elementos específicos
        [
          "group-administrativo",
          "administrativo-tiendas",
          "administrativo-productos",
          "administrativo-ventas",
          "administrativo-ventas-boleta",
          "administrativo-ventas-factura",
          "group-logistico",
          "logistico-mover-mercaderia",
          "logistico-mover-mercaderia-mover",
          "logistico-mover-mercaderia-historial",
          "logistico-compras",
          "group-ventas",
          "ventas-generar",
          "ventas-generar-boleta",
          "ventas-generar-factura",
          "ventas-devoluciones",
        ].includes(key),
      produccion: (key) =>
        // Rol de "producción" tiene acceso a estos elementos específicos
        [
          "group-logistico",
          "logistico-almacen-productos",
          "logistico-mover-mercaderia",
          "logistico-mover-mercaderia-mover",
          "group-produccion",
          "produccion-almacen-telas",
          "produccion-lotes",
        ].includes(key),
    };

    // Función para validar acceso según el rol del usuario
    const hasAccess = rolePermissions[user.rol] || (() => false);

    return items
      .filter((item) => hasAccess(item.key)) // Filtra los elementos principales según el acceso del rol
      .map((item) => {
        // Si hay hijos, filtra también los hijos
        if (item.children) {
          const filteredChildren = filterMenuItemsByRole(item.children);
          return { ...item, children: filteredChildren }; // Retorna los elementos con los hijos filtrados
        }
        return item; // Si no tiene hijos, simplemente retorna el item
      });
  };

  // Definición de los elementos del menú
  const menuItems = [
    {
      key: "group-administrativo",
      label: "ADMINISTRATIVO",
      type: "group",
      children: [
        {
          key: "administrativo-trabajadores",
          label: "Trabajadores",
          icon: <BookOutlined />,
          children: [
            { key: "administrativo-trabajadores-ventas", icon: <UserOutlined />, label: <Link to="/admin/trabajadores/tipo/ventas">Vendedores</Link> },
            { key: "administrativo-trabajadores-talleres", icon: <UserOutlined />, label: <Link to="/admin/trabajadores/tipo/talleres">Talleres</Link> },
            { key: "administrativo-trabajadores-miscelaneos", icon: <UserOutlined />, label: <Link to="/admin/trabajadores/tipo/miscelaneos">Miscelaneos</Link> },
            { key: "administrativo-trabajadores-costureros", icon: <UserOutlined />, label: <Link to="/admin/trabajadores/tipo/costureros">Costureros</Link> },
          ],
        },
        { key: "administrativo-tiendas", icon: <HarmonyOSOutlined />, label: <Link to="/admin/tiendas">Tiendas</Link> },
        { key: "administrativo-productos", icon: <CoffeeOutlined />, label: <Link to="/admin/productos">Productos</Link> },
        {
          key: "administrativo-ventas",
          label: "Ventas",
          icon: <BookOutlined />,
          children: [
            { key: "administrativo-ventas-boleta", icon: <UserOutlined />, label: <Link to="/admin/ventas/boleta">Boletas</Link> },
            { key: "administrativo-ventas-factura", icon: <UserOutlined />, label: <Link to="/admin/ventas/factura">Facturas</Link> },
          ],
        },
      ],
    },
    {
      key: "group-logistico",
      label: "LOGÍSTICO",
      type: "group",
      children: [
        { key: "logistico-almacen-productos", icon: <BookOutlined />, label: <Link to="/logistico/almacen_productos">Almacen Productos</Link> },
        {
          key: "logistico-mover-mercaderia",
          label: "Mover Mercadería",
          icon: <BookOutlined />,
          children: [
            { key: "logistico-mover-mercaderia-mover", icon: <UserOutlined />, label: <Link to="/logistico/movimientos_generar">Mover Mercadería</Link> },
            { key: "logistico-mover-mercaderia-historial", icon: <UserOutlined />, label: <Link to="/logistico/movimientos_historial">Historial</Link> },
          ],
        },
        { key: "logistico-compras", icon: <CoffeeOutlined />, label: <Link to="/logistico/compras">Compras</Link> },
      ],
    },
    {
      key: "group-produccion",
      label: "PRODUCCIÓN",
      type: "group",
      children: [
        { key: "produccion-almacen-telas", icon: <BookOutlined />, label: <Link to="/prod/telas">Almacén de Telas</Link> },
        { key: "produccion-lotes", icon: <BookOutlined />, label: <Link to="/prod/lotes">Lotes</Link> },
      ],
    },
    {
      key: "group-ventas",
      label: "VENTAS",
      type: "group",
      children: [
        {
          key: "ventas-generar",
          label: "Generar Venta",
          icon: <BookOutlined />,
          children: [
            { key: "ventas-generar-boleta", icon: <BookOutlined />, label: <Link to="/generar/venta/boleta">Boleta</Link> },
            { key: "ventas-generar-factura", icon: <BookOutlined />, label: <Link to="/generar/venta/factura">Factura</Link> },
          ],
        },
        { key: "ventas-devoluciones", icon: <BookOutlined />, label: <Link to="/devoluciones">Devoluciones</Link> },
      ],
    },
  ];

  const filteredMenuItems = filterMenuItemsByRole(menuItems); // Filtra los items del menú según el rol del usuario

  // Renderiza el menú filtrado
  return <Menu mode="inline" items={filteredMenuItems} defaultSelectedKeys={["group-administrativo"]} />;
};

export default SidebarMenu;

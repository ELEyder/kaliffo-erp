import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { BookOutlined, UserOutlined, CoffeeOutlined, AppstoreOutlined } from "@ant-design/icons";

const SidebarMenu = ({ rol }) => {

  const filterMenuItemsByRole = (items) => {
    const rolePermissions = {
      administrador: () => true, // Acceso total
      venta: (key) =>
        [
          "administrativo-tiendas",
          "administrativo-productos",
          "administrativo-ventas-boleta",
          "administrativo-ventas-factura",
          "logistico-mover-mercaderia-mover",
          "logistico-mover-mercaderia-historial",
          "logistico-compras",
          "ventas-generar-boleta",
          "ventas-generar-factura",
          "ventas-devoluciones",
        ].includes(key),
      produccion: (key) =>
        [
          "logistico-almacen-productos",
          "logistico-mover-mercaderia-mover",
          "produccion-almacen-telas",
          "produccion-lotes",
        ].includes(key),
    };

    const hasAccess = rolePermissions[rol] || (() => false);

    return items
      .filter((item) => hasAccess(item.key)) 
      .map((item) => {
        if (item.children) {
          const filteredChildren = filterMenuItemsByRole(item.children);
          return { ...item, children: filteredChildren };
        }
        return item;
      });
  };

  // Definición del menú con las nuevas rutas
  const menuItems = [
    {
      key: "group-administrativo",
      label: "ADMINISTRATIVO",
      type: "group",
      children: [
        { key: "administrativo-trabajadores", icon: <UserOutlined />, label: <Link to="/administrativo/trabajadores">Trabajadores</Link> },
        { key: "administrativo-tiendas", icon: <AppstoreOutlined />, label: <Link to="/administrativo/tiendas">Tiendas</Link> },
        { key: "administrativo-productos", icon: <CoffeeOutlined />, label: <Link to="/administrativo/productos">Productos</Link> },
        {
          key: "administrativo-ventas",
          label: "Ventas",
          icon: <BookOutlined />,
          children: [
            { key: "administrativo-ventas-boleta", label: <Link to="/administrativo/ventas/boleta">Boletas</Link> },
            { key: "administrativo-ventas-factura", label: <Link to="/administrativo/ventas/factura">Facturas</Link> },
          ],
        },
      ],
    },
    {
      key: "group-logistico",
      label: "LOGÍSTICO",
      type: "group",
      children: [
        { key: "logistico-almacen-productos", icon: <BookOutlined />, label: <Link to="/logistico/almacen">Almacenes de Productos</Link> },
        {
          key: "logistico-mover-mercaderia",
          label: "Mover Mercadería",
          icon: <BookOutlined />,
          children: [
            { key: "logistico-mover-mercaderia-mover", label: <Link to="/logistico/movimientos/generar">Mover Mercadería</Link> },
            { key: "logistico-mover-mercaderia-historial", label: <Link to="/logistico/movimientos/historial">Historial</Link> },
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
        { key: "produccion-almacen-telas", icon: <BookOutlined />, label: <Link to="/produccion/telas">Almacén de Telas</Link> },
        { key: "produccion-lotes", icon: <BookOutlined />, label: <Link to="/produccion/lotes">Lotes</Link> },
      ],
    },
    {
      key: "group-ventas",
      label: "COMERCIAL",
      type: "group",
      children: [
        {
          key: "ventas-generar",
          label: "Generar Venta",
          icon: <BookOutlined />,
          children: [
            { key: "ventas-generar-boleta", label: <Link to="/comercial/venta/generar/boleta">Boleta</Link> },
            { key: "ventas-generar-factura", label: <Link to="/comercial/venta/generar/factura">Factura</Link> },
          ],
        },
        { key: "ventas-devoluciones", icon: <BookOutlined />, label: <Link to="/comercial/devoluciones">Devoluciones</Link> },
      ],
    },
  ];

  const filteredMenuItems = filterMenuItemsByRole(menuItems);

  return <Menu mode="inline" items={filteredMenuItems} defaultSelectedKeys={["group-administrativo"]} />;
};

export default SidebarMenu;

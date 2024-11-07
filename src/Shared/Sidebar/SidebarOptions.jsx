import React, { useState } from "react";
import { Divider, Menu } from "antd";
import { Link } from "react-router-dom";
import { BookOutlined, UserOutlined, CoffeeOutlined, HarmonyOSOutlined } from '@ant-design/icons';

const Items = [
  {
    key: 'ADMINISTRATIVO',
    label: 'ADMINISTRATIVO',
    type: 'group',
    children: [
      {
        key: "sub1",
        label: "Trabajadores",
        icon: <BookOutlined />,
        children: [
          {
            key: "1",
            icon: <UserOutlined />,
            label: (
              <Link to="/trabajadores/tipo/ventas" style={{ textDecoration: "none" }}>Vendedores</Link>
            ),
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: (
              <Link to="/trabajadores/tipo/talleres" style={{ textDecoration: "none" }}>Talleres</Link>
            ),
          },
          {
            key: "3",
            icon: <UserOutlined />,
            label: (
              <Link to="/trabajadores/tipo/miscelaneos" style={{ textDecoration: "none" }}>Miscelaneos</Link>
            ),
          },
          {
            key: "4",
            icon: <UserOutlined />,
            label: (
              <Link to="/trabajadores/tipo/costureros" style={{ textDecoration: "none" }}>Costureros</Link>
            ),
          }
        ]
      },
      {

        key: "sub2",
        icon: <HarmonyOSOutlined />,
        label: (<Link to={"/tiendas"} style={{ textDecoration: "none" }} >Tiendas</Link>)
      },
      {
        key: "sub4",
        icon: <CoffeeOutlined />,
        label: (<Link to={"/productos"} style={{ textDecoration: "none" }} >Productos</Link>)
      },
      {
        key: "sub5",
        label: "Ventas",
        icon: <BookOutlined />,
        children: [
          {
            key: "5",
            icon: <UserOutlined />,
            label: (
              <Link to="/ventas/boleta" style={{ textDecoration: "none" }}>Boletas</Link>
            ),
          },
          {
            key: "6",
            icon: <UserOutlined />,
            label: (
              <Link to="/ventas/factura" style={{ textDecoration: "none" }}>Facturas</Link>
            ),
          },
        ]
      },
    ],
  },
  {
    key: 'LOGÍSTICO',
    label: 'LOGÍSTICO',
    type: 'group',
    children: [{
      key: "sub6",
      label: "Mover Mercaderia",
      icon: <BookOutlined />,
      children: [
        {
          key: "7",
          icon: <UserOutlined />,
          label: (
            <Link to="/ventas/boleta" style={{ textDecoration: "none" }}>Mover Mercaderia</Link>
          ),
        },
        {
          key: "8",
          icon: <UserOutlined />,
          label: (
            <Link to="/ventas/factura" style={{ textDecoration: "none" }}>Historial</Link>
          ),
        },
      ]
    },
    {
      icon: <CoffeeOutlined />,
      label: (<Link to={"/compras"} style={{ textDecoration: "none" }} >Compras</Link>)
    },
    ]
  },
  {
    key: 'PRODUCCIÓN',
    label: 'PRODUCCIÓN',
    type: 'group',
    children: [
      {
        key: "sub7",
        label: (<Link to={"/telas"} style={{ textDecoration: "none" }} >Almacen de Telas</Link>),
        icon: <BookOutlined />,
      },
      {
        key: "lotes",
        label: (<Link to={"/lotes"} style={{ textDecoration: "none" }} >Lotes</Link>),
        icon: <BookOutlined />,
      },
    ]
  },
  {
    key: 'VENTAS',
    label: 'VENTAS',
    type: 'group',
    children: [
      {
        key: "sub8",
        label:"Generar Venta",
        icon: <BookOutlined />,
        children:[
          {
            key:"9",
            icon:<BookOutlined/>,
            label: (
              <Link to="/gVenta/boleta" style={{ textDecoration: "none" }}>Boleta</Link>
            )
          },
          {
            key:"10",
            icon:<BookOutlined/>,
            label: (
              <Link to="/gVenta/factura" style={{ textDecoration: "none" }}>Factura</Link>
            )
          }
        ]
      },
      {
        key: "lotes",
        label: (<Link to={"/lotes"} style={{ textDecoration: "none" }} >Devoluciones</Link>),
        icon: <BookOutlined />,
      },
    ]
  },
]

const SidebarOptions = () => {

  return (
    <>
    <link rel="stylesheet" href="/css/shared/sidebar.css"/>
    <Menu
      mode="inline"
      theme="dark"
      items={Items}
    />
    </>
  )
}

export default SidebarOptions
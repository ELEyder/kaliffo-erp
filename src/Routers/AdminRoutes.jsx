import React from "react";
import { Routes, Route } from "react-router-dom";

import VentasView from "@V/Administrativo/Ventas/VentasView";
import TrabajadoresView from "@V/Administrativo/Trabajadores/TrabajadoresView";
import TrabajadorView from "@V/Administrativo/Trabajadores/TrabajadorView";
import TiendasView from "@V/Administrativo/Tiendas/TiendasView";
import TiendaView from "@V/Administrativo/Tiendas/TiendaView";
import ProductosView from "@V/Administrativo/Productos/ProductosView";
import ProductoView from "@V/Administrativo/Productos/ProductoView";

const AdminRoutes = () => (
    <Routes>
        {/* Rutas de Ventas */}
        <Route path="/ventas" element={<VentasView />} />

        {/* Rutas de Trabajadores */}
        <Route path="/trabajadores/tipo/:tipo" element={<TrabajadoresView />} />
        <Route path="/trabajadores/:id" element={<TrabajadorView />} />

        {/* Rutas de Tiendas */}
        <Route path="/tiendas" element={<TiendasView />} />
        <Route path="/tiendas/:id" element={<TiendaView />} />

        {/* Rutas de Productos */}
        <Route path="/productos" element={<ProductosView />} />
        <Route path="/productos/:id" element={<ProductoView />} />
    </Routes>
);

export default AdminRoutes;

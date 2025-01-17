import React, { useState } from "react";
import ProductoInfoCard from "@C/administrativo/productos/ProductoInfoCard";
import ProductoTiendasTable from "@CA/productos/ProductoTiendasTable";
import ProductoTallasTable from "@CA/productos/ProductoTallasTable";
import ProductoColoresTable from "@CA/productos/ProductoColoresTable";

import * as Tiendas from "../../../interfaces/Tiendas";

import { Flex, Divider, Tabs } from "antd";
import Tabla from "../../../Components/Tabla";
import { useParams } from "react-router-dom";

const ProductoView = () => {  
  // Definición de las pestañas con sus respectivos componentes
  const { id } = useParams()
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [idT, setIdT] = useState(0); // Estado para almacenar el ID de la tienda seleccionada

  const [modals, setModals] = useState({
    "tiendaD": false,
    "addP": false,
    "proD": false,
  })
  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = Tiendas.getColumnas(changeModal, setIdT, ()=> setReload(!reload))

  const items = [
    {
      key: '1', label: 'Tiendas',
      children: <Tabla
        columnas={columnas}
        rowKey={"producto_id"}
        url={Tiendas.getUrl(id)}
        reload={() => setReload(!reload)}
      />
    },
    {
      key: "2", label: "Personal",
      children: (
        <Tabla
          columnas={columnas}
          rowKey={"trabajador_id"}
          url={Tiendas.getUrl(id)}
          reload={() => setReload(!reload)}
        />
      ),
    },
    {
      key: '3', label: 'Colores',
      children: <Tabla
        columnas={columnas}
        rowKey={"codigo"}
        url={Tiendas.getUrl(id)}
        reload={() => setReload(!reload)}
      />
    },
  ];
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Detalles del Producto
      </Divider>

      {/* Diseño de dos columnas: una para la información del producto y otra para las pestañas */}
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px", // Máxima anchura del contenedor
          margin: "0 auto", // Centrado horizontal
          padding: "1rem", // Espaciado interno
        }}
      >
        {/* Componente con la información del producto */}
        <ProductoInfoCard />
        <Tabs defaultActiveKey="1" items={items} />
      </Flex>

      {/* Divisor adicional para separar contenido */}
      <Divider />
    </>
  );
};

export default ProductoView;

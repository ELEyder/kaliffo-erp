import { useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Flex, Tabs } from "antd";
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal";

import ProductosPorAlmacenTable from "../../components/Tables/ProductosPorAlmacenTable";
import AlmacenCard from "../../components/Cards/AlmacenCard";

const Almacen = () => {
  const { id } = useParams();

  const items = [
    {
      key: "1",
      label: "Productos",
      children: (
        <ProductosPorAlmacenTable
        id={id}
        />
      ),
    },
  ];

  return (
    <>
      <Divider>DETALLES DEL ALMACEN</Divider>

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
        <AlmacenCard
          id={id}
        />

        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "700px",
          }}
          items={items}
        />
      </Flex>

    </>
  );
};

export default Almacen;

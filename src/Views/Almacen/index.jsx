import { useParams } from "react-router-dom";
import AlmacenCard from "@CL/AlmacenProductos/AlmacenCard";
import { Divider, Flex, Tabs } from "antd";
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para mostrar los detalles de un producto
import Tabla from "../../Components/Tabla/Tabla";

import * as AlmacenProductos from "../../interfaces/AlmacenesProductos";
import { useState } from "react";

const Almacen = () => {
  const { id } = useParams();
  const [idP, setidP] = useState(1);
  const [modals, setModals] = useState({
    proD: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnasPro = AlmacenProductos.getColumnas(changeModal, setidP);

  const items = [
    {
      key: "1",
      label: "Productos",
      children: (
        <Tabla
          columnas={columnasPro}
          rowKey={"producto_id"}
          url={AlmacenProductos.getUrl(id)}
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
          style={{
            flex: "1 1 45%",
            minWidth: "400px", // Ancho mínimo
            maxWidth: "700px", // Ancho máximo
          }}
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

      <ProductoDetalleModal
        openModal={modals.proD} // Visibilidad del modal
        closeModal={() => changeModal("proD", false)} // Función para cerrar el modal
        tipo="almacen_id"
        id={id} // Pasar el ID de la tienda
        idp={idP} // Pasar el ID del producto seleccionado
      />
    </>
  );
};

export default Almacen;

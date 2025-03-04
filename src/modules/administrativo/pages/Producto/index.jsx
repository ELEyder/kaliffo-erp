import React, { useState } from "react";
import ProductoInfoCard from "@C/administrativo/productos/ProductoInfoCard";

import ProductoDetalleTallasColoresModal from "@CA/productos/ProductoDetalleTallasColoresModal"; // Modal para detalles de tallas y colores
import TallaDetalleModal from "@CA/productos/TallaDetalleModal"; // Modal para ver detalles de talla
import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"; // Modal para detalles de la tienda

import * as Tiendas from "../../../../interfaces/Tiendas";
import * as Tallas from "../../../../interfaces/Tallas";
import * as Colores from "../../../../interfaces/Colores";

import { Flex, Divider, Tabs } from "antd";
import { Tabla } from "../../../../Components/UI";
import { useParams } from "react-router-dom";
import { Details } from "../../../../layouts";
import ProductoCard from "../../components/Cards/ProductoCard";
import StockPorTiendaTable from "../../components/Tables/StockPorTienda";

const ProductoView = () => {
  const { id } = useParams();
  const [reload, setReload] = useState(true); // Estado para activar recarga después de acciones como agregar/eliminar
  const [idT, setIdT] = useState(0); // Estado para almacenar el ID de la tienda seleccionada
  const [talla, setTalla] = useState(0);
  const [detalleColor, setDetalleColor] = useState(0);

  const [modals, setModals] = useState({
    tiendaD: false,
    tallaD: false,
    colorD: false,
  });
  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = Tiendas.getColumnas(changeModal, setIdT, () =>
    setReload(!reload)
  );
  const columnasT = Tallas.getColumnas(changeModal, setTalla);
  const columnasC = Colores.getColumnas(changeModal, setDetalleColor);

  const items = [
    {
      key: "1",
      label: "Stock por tienda",
       children: (
         <StockPorTiendaTable
           id={id}
         />
       ),
    },
    {
      key: "2",
      label: "Tallas",
      children: (
        <Tabla
          columnas={columnasT}
          rowKey={"trabajador_id"}
          url={Tallas.getUrl(id)}
          reload={() => setReload(!reload)}
        />
      ),
    },
    {
      key: "3",
      label: "Colores",
      children: (
        <Tabla
          columnas={columnasC}
          rowKey={"codigo"}
          url={Colores.getUrl(id)}
          reload={() => setReload(!reload)}
        />
      ),
    },
  ];
  return (
    <>
      {/* Encabezado con un divisor estilizado */}
      <Divider style={{ textTransform: "uppercase" }}>
        Detalles del Producto
      </Divider>
      <Details>
      <ProductoCard
          id={id}
        />
        <Tabs
          style={{
            flex: "1 1 45%",
            minWidth: "400px",
            maxWidth: "500px",
          }}
          defaultActiveKey="1"
          items={items}
        />
      </Details>

      <ProductoDetalleModal
        openModal={modals.tiendaD} // Estado para controlar la visibilidad del modal
        closeModal={() => changeModal("tiendaD", false)} // Función para cerrar el modal
        tipo="tienda_id"
        id={id} // ID de la tienda seleccionada
        idp={idT} // Pasar el ID del producto como prop
      />

      {/*Tallas*/}
      <ProductoDetalleTallasColoresModal
        openModal={modals.tallaD} // Estado para controlar la visibilidad del modal
        closeModal={() => changeModal("tallaD", false)} // Función para cerrar el modal
        id={id} // ID del producto
        talla={talla} // Talla seleccionada
      />

      {/*Colores*/}
      <TallaDetalleModal
        openModal={modals.colorD} // Controla la visibilidad del modal
        closeModal={() => changeModal("colorD", false)} // Cierra el modal
        idD={detalleColor} // Pasa el ID del detalle al modal
      />
    </>
  );
};

export default ProductoView;

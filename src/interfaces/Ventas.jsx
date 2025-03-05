import { Flex, Button, Popconfirm } from "antd";
import { ApiClient }from "../API/ApiClient";

export const getColumnas = (reload) => {
  const columnas = [
    { title: "Nº", dataIndex: "id", key: "id", align: "center" }, // Columna para el número de venta
    { title: "Código", dataIndex: "codigo", key: "codigo", align: "center" }, // Columna para el código de venta
    { title: "Tipo de Venta", dataIndex: "tipo", key: "tipo", align: "center" }, // Columna para el tipo de venta
    { title: "Fecha de Venta", dataIndex: "fechaVenta", key: "fechaVenta", align: "center" }, // Columna para la fecha de venta
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", align: "center" }, // Columna para la cantidad vendida
    { title: "Total Bruto", dataIndex: "totalBruto", key: "totalBruto", align: "center" }, // Columna para el total bruto
    { title: "Total Neto", dataIndex: "totalNeto", key: "totalNeto", align: "center" }, // Columna para el total neto
    { title: "IGV", dataIndex: "IGV", key: "IGV", align: "center" }, // Columna para el IGV (impuesto)
    { title: "Tipo de Pago", dataIndex: "tipoPago", key: "tipoPago", align: "center" }, // Columna para el tipo de pago
    { title: "RUC", dataIndex: "RUC", key: "RUC", align: "center" }, // Columna para el RUC (registro único de contribuyente)
    { title: "Tienda", dataIndex: "tiendaId", key: "tiendaId", align: "center" }, // Columna para la tienda

    // Columna para las opciones (Eliminar)
    {
      title: "Opciones",
      dataIndex: "codigo",
      key: "opciones",
      align: "center",
      render: (text) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
            <Popconfirm
              title="ANULAR" // Título de la confirmación para eliminar
              description="¿DESEA ANULAR ESTA VENTA?" // Descripción de la confirmación
              okText="Confirmar" // Texto para confirmar la eliminación
              onConfirm={ async(e) => {
                e.stopPropagation(); // Evitar la propagación del evento
                await ApiClient.delete(`/trabajador/delete/${text}`); // Llamar a la función para eliminar la venta con el código proporcionado
                reload()
              }}
              cancelText="NO" // Texto para cancelar la eliminación
            >
              <Button
                block
                style={{ background: "#f54242", color: "white" }} // Estilo para el botón de eliminar
                danger
                onClick={(e) => e.stopPropagation()} // Evitar la propagación del evento al hacer clic
              >
                Anular
              </Button>
            </Popconfirm>
        </Flex>
      ),
    },
  ];


  return columnas
}

export const getUrl = (id) => {
  return `Trabajador?tienda_id=${id}`
}

export const getData = () => {
  return [
    {
      id: 3,
      codigo: 3,
      tipo: 1,
      fechaVenta: "2024-09-12",
      cantidad: 2,
      totalBruto: 2,
      totalNeto: 2,
      IGV: 2,
      tipoPago: "Tarjeta de crédito",
      RUC: 1231234123,
      tiendaId: 123145143,
    },
    {
      id: 4,
      codigo: 4,
      tipo: 1,
      fechaVenta: "2024-09-12",
      cantidad: 2,
      totalBruto: 2,
      totalNeto: 2,
      IGV: 2,
      tipoPago: "Tarjeta de crédito",
      RUC: 123145143,
      tiendaId: 123145143,
    },
  ];
}
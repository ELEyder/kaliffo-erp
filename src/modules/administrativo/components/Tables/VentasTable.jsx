import { Button, Flex, Popconfirm } from "antd";
import { Tabla } from "../../../../components/UI";

const VentasTable = () => {
  const columnas = [
    { title: "Nº (Datos de prueba)", dataIndex: "id" },
    { title: "Código", dataIndex: "codigo" },
    { title: "Tipo de Venta", dataIndex: "tipo" },
    { title: "Fecha de Venta", dataIndex: "fechaVenta" },
    { title: "Cantidad", dataIndex: "cantidad" },
    { title: "Total Bruto", dataIndex: "totalBruto" },
    { title: "Total Neto", dataIndex: "totalNeto" },
    { title: "IGV", dataIndex: "IGV" },
    { title: "Tipo de Pago", dataIndex: "tipoPago" },
    { title: "RUC", dataIndex: "RUC" },
    { title: "Tienda", dataIndex: "tiendaId" },
    {
      title: "Opciones",
      dataIndex: "codigo",
      render: (text) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Popconfirm
            title="ANULAR"
            description="¿DESEA ANULAR ESTA VENTA?"
            okText="Confirmar"
            onConfirm={async (e) => {
              e.stopPropagation();
              await ApiClient.delete(`/trabajador/delete/${text}`);
            }}
            cancelText="NO"
          >
            <Button
              block
              style={{ background: "#f54242", color: "white" }}
              danger
              onClick={(e) => e.stopPropagation()}
            >
              Anular
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const ventas = [
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

  return (
    <>
      <Tabla columnas={columnas} rowKey={"id"} dataSource={ventas} />
    </>
  );
};

export default VentasTable;

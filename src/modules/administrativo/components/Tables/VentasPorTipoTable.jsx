import useVentas from "../../hooks/useVentas";
import Tabla from "../../../../Components/UI/Tabla";

const VentasPorTipoTable = ({ tipo }) => {
  const { ventas, loading } = useVentas(tipo)

  const columnas = [
    {
      title: "Nº",
      dataIndex: "id",
    },
    {
      title: "Código",
      dataIndex: "codigo",
    },
    {
      title: tipo === "boleta" ? "DNI" : "RUC",
      dataIndex: tipo === "boleta" ? "dni" : "ruc",
    },
    {
      title: "Tipo de Venta",
      dataIndex: "tipoVenta",
    },
    {
      title: "Fecha de Venta",
      dataIndex: "fecha",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad_total",
    },
    {
      title: "Total Bruto",
      dataIndex: "totalBruto",
    },
    {
      title: "Total Neto",
      dataIndex: "totalNeto",
    },
    {
      title: "IGV",
      dataIndex: "totalIgv",
    },
    {
      title: "Tipo de Pago",
      dataIndex: "tipoPago",
      onCell: (record) => ({
        style: {
          background:
            record.tipoPago === "Efectivo"
              ? "#248304"
              : record.tipoPago === "Yape"
              ? "#8522a3"
              : "#6fceea",
          color: record.tipoPago === "Transferencia" ? "black" : "white",
        },
      }),
      sorter: (a, b) => a.tipoPago.localeCompare(b.tipoPago),
    },
    {
      title: "Tienda",
      dataIndex: "tienda",
    },
  ];
  
  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"venta_id"}
        dataSource={ventas}
        loading={loading}
      />
    </>
  );
};

export default VentasPorTipoTable;

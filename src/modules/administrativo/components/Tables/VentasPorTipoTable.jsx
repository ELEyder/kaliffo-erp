import useVentas from "../../hooks/useVentas";
import Tabla from "../../../../components/UI/Tabla";

const VentasPorTipoTable = ({ tipo }) => {
  const { ventas, loading } = useVentas(tipo)

  const columnas = [
    { title: "Nº", dataIndex: "id" },
    { title: "Código", dataIndex: "codigo" },
    { title: tipo === "boleta" ? "DNI" : "RUC", dataIndex: tipo === "boleta" ? "dni" : "ruc", },
    { title: "Tipo de Venta", dataIndex: "tipoVenta" },
    { title: "Fecha de Venta", dataIndex: "fecha" },
    { title: "Cantidad", dataIndex: "cantidad_total" },
    { title: "Total Bruto", dataIndex: "totalBruto" },
    { title: "Total Neto", dataIndex: "totalNeto" },
    { title: "IGV", dataIndex: "totalIgv" },
    { title: "Tipo de Pago", dataIndex: "tipoPago",
      
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

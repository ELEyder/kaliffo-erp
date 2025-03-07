import { Tabla } from "../../../../components/UI";
import { usePagos } from "../../hooks";

const PagosTable = ({ id }) => {
  const { pagos } = usePagos(id);

  let columnas = [
    {
      title: "Monto Pagado",
      dataIndex: "montoPagado",
      render: (text) => ("S/" + text) // Formatear el monto con el símbolo de moneda "S/"
    },
    {
      title: "Monto Faltante",
      dataIndex: "montoFaltante",
      render: (text) => ("S/" + text) // Formatear el monto faltante con el símbolo de moneda "S/"
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-ES") : "-",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      render: (text) => {
        return text || "Desconocido";
      },
      // Estilo de la celda personalizado según el estado del pago
      onCell: (record) => ({
        style: {
          background: record.estado === "En Proceso" ? '#FCFB77' : 'green', // Amarillo para "En Proceso", Verde para "Completado"
          color: record.estado === "En Proceso" ? "black" : "white", // Color del texto según el estado
        }
      }),
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"pago_id"}
        dataSource={pagos}
      />
    </>
  );
};

export default PagosTable;

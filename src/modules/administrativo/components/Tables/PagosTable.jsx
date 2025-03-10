import { Tabla } from "../../../../components/UI";
import { usePagos } from "../../hooks";

const PagosTable = ({ id }) => {
  const { pagos } = usePagos(id);

  let columnas = [
    { title: "Monto Pagado", dataIndex: "montoPagado" },
    { title: "Monto Faltante", dataIndex: "montoFaltante" },
    { title: "Fecha", dataIndex: "fecha" },
    { title: "Estado", dataIndex: "estado" },
  ];

  return (
    <>
      <Tabla columnas={columnas} rowKey={"pago_id"} dataSource={pagos} />
    </>
  );
};

export default PagosTable;

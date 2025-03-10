import { Tabla } from "../../../../components/UI";
import { useStockPorTalla } from "../../hooks";

const StockPorTallaTable = ({ id }) => {
  const { tallas, loading } = useStockPorTalla(id);

  let columnas = [
    { title: "Tallas", dataIndex: "tallas" },
    { title: "Stock", dataIndex: "stock" },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"talla_id"}
        dataSource={tallas}
        loading={loading}
      />
    </>
  );
};

export default StockPorTallaTable;

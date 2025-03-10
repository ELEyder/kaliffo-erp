import { Tabla } from "../../../../components/UI";
import { useStockPorTienda } from "../../hooks";

const StockPorTiendaTable = ({ id }) => {
  const { tiendas, loading } = useStockPorTienda(id);

  let columnas = [
    { title: "Tienda", dataIndex: "tienda" },
    { title: "Stock", dataIndex: "stock" },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"tienda_id"}
        dataSource={tiendas}
        loading={loading}
      />
    </>
  );
};

export default StockPorTiendaTable;

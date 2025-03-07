import { Tabla } from "../../../../components/UI";
import useStockPorColor from "../../hooks/useStockPorColores";

const StockPorColoresTable = ({ id }) => {
  const { colores, loading } = useStockPorColor(id);

  let columnas = [
    { title: "Colores", dataIndex: "color" },
    {
      title: "Stock", dataIndex: "stock",
      onCell: (record) => ({
        style: {
          background: record.stock >= 50
            ? 'green'
            : record.stock <= 20
              ? '#f54242'
              : '#FCFB77',
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
          padding: "10px",
        }
      }),
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"color_id"}
        dataSource={colores}
        loading={loading}
      />
    </>
  );
};

export default StockPorColoresTable;
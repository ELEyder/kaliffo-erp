import { Tabla } from "../../../../Components/UI";
import useStockPorTalla from "../../hooks/useStockPorTalla";

const StockPorTallaTable = ({ id }) => {
  const { tallas, loading } = useStockPorTalla(id);

  let columnas = [
    { title: "Tallas", dataIndex: "tallas" },
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
        rowKey={"talla_id"}
        dataSource={tallas}
        loading={loading}
      />
    </>
  );
};

export default StockPorTallaTable;
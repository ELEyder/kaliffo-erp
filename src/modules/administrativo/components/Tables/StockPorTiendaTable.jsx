import { Tabla } from "../../../../components/UI";
import useStockPorTienda from "../../hooks/useStockPorTienda";

const StockPorTiendaTable = ({ id }) => {
  const { tiendas, loading } = useStockPorTienda(id);

  let columnas = [
    { title: "Tienda", dataIndex: "tienda" },
    {
      title: "Stock", dataIndex: "stock",
      onCell: (record) => ({
        style: { // Estilo condicional basado en el stock
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
              ? '#f54242' // Rojo si el stock es menor o igual a 20
              : '#FCFB77', // Amarillo si el stock está entre 21 y 49
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto
          padding: "10px", // Espaciado interno
        }
      }),
    },
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
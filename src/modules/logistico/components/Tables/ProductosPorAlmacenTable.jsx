import { useEffect } from "react";
import { Tabla } from "../../../../components/UI";
import useProductosPorAlmacen from "../../hooks/useProductosPorAlmacen";

const ProductosPorAlmacenTable = ({ id }) => {
  const { productos, loading, getProductos } = useProductosPorAlmacen(id);

  useEffect(() => {
    getProductos(id);
  }, []);

  const columnas = [
    { title: "Producto", dataIndex: "nombre" },
    {
      title: "Stock",
      dataIndex: "stock",
      onCell: (record) => ({
        style: {
          background:
            record.stock >= 50
              ? "green"
              : record.stock <= 20
              ? "#f54242"
              : "#FCFB77",
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
          padding: "10px",
        },
      }),
    },
  ];

  return (
    <Tabla
      columnas={columnas}
      rowKey={"producto_id"}
      dataSource={productos}
      loading={loading}
    />
  );
};

export default ProductosPorAlmacenTable;

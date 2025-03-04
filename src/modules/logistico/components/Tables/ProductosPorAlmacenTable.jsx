import { Tabla } from "../../../../Components/UI";
import useProductosPorAlmacen from "../../hooks/useProductosPorAlmacen";

const ProductosPorAlmacenTable = ({ id }) => {

  const { productos, loading } = useProductosPorAlmacen(id)
  const columnas = [
    { title: "Producto", dataIndex: "nombre" },
    { title: "Stock", dataIndex: "stock", 
      onCell: (record) => ({
        style: {
          background:
            record.stock >= 50
              ? "green" // Verde para stock >= 50
              : record.stock <= 20
              ? "#f54242" // Rojo para stock <= 20
              : "#FCFB77", // Amarillo para stock intermedio
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto basado en el stock
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

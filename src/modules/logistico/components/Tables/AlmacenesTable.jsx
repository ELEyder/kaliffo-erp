import { Tabla } from "../../../../components/UI";
import useAlmacenes from "../../hooks/useAlmacenes";

const AlmacenesTable = () => {

  const { almacenes, loading } = useAlmacenes()
  const columnas = [
    { title: "Nombre del Almacen", dataIndex: "nombre_almacen" },
    { title: "Stock", dataIndex: "stock_total", 
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
      dataSource={almacenes}
      loading={loading}
    />
  );
};

export default AlmacenesTable;

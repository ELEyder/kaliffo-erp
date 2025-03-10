import { useState } from "react";
import { FloatButton } from "antd";
import { Tabla, Loading } from "../../../../components/UI";
import { useProductos } from "../../hooks";
import { AddProductoModal } from "../Modals";

const ProductosTable = () => {
  const { productos, loading, getProductos } = useProductos();
  const [addProducto, setAddProducto] = useState(false);

  const columnas = [
    { title: "Producto", dataIndex: "nombre" },
    {
      title: "Stock",
      dataIndex: "stockTotal",
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
    {
      title: "Precio",
      dataIndex: "precioBase",
      render: (text) => `S/ ${text}`,
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      render: (text) => `${text}%`,
      onCell: (record) => ({
        style: {
          background:
            record.descuento <= 10
              ? "green"
              : record.descuento >= 20
              ? "#f54242"
              : "#FCFB77",
          color:
            record.descuento <= 10 || record.descuento >= 20
              ? "white"
              : "black",
          padding: "10px",
        },
      }),
    },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"producto_id"}
        dataSource={productos}
      />

      <FloatButton onClick={() => setAddProducto(true)} />

      <AddProductoModal
        openModal={addProducto}
        closeModal={() => setAddProducto(false)}
        onAdded={getProductos}
      />
    </>
  );
};

export default ProductosTable;

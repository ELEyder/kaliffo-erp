import { useEffect } from "react";
import { useProducto } from "../../hooks";
import { DefaultCard } from "../../../../components/UI";
import { Dropdown } from "antd";

const ProductoCard = ({ id }) => {
  const { producto, loading, getProducto } = useProducto();

  useEffect(() => {
    getProducto();
  }, [id]);

  const { nombre, stockTotal, precioBase, descuento, cantidad_colores } =
    producto;

  const items = [
    { key: "1", label: "Histórico" },
    { key: "2", label: "Último Mes" },
  ];

  return (
    <DefaultCard
      title={nombre}
      image={`./img/productos/${id}.png`}
      loading={loading}
      list={[
        { title: "STOCK TOTAL", value: stockTotal },
        { title: "PRECIO BASE", value: "S/" + precioBase },
        { title: "DESCUENTO", value: descuento + "%" },
        { title: "COLORES", value: cantidad_colores },
      ]}
    >
      <Dropdown.Button
        menu={{ items, onClick: () => alert("Próximamente") }}
        block
        size="large"
        style={{ fontWeight: "bold" }}
      >
        OBTENER REPORTE
      </Dropdown.Button>
    </DefaultCard>
  );
};

export default ProductoCard;

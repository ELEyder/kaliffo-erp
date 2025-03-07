import { useEffect } from "react";
import { DefaultCard } from "../../../../components/UI";
import useAlmacen from "../../hooks/useAlmacen";

const AlmacenCard = ({ id }) => {
  const { almacen, getAlmacen, loading } = useAlmacen();

  useEffect(() => {
    getAlmacen(id)
  }, [id])

  return (
    <DefaultCard
      title={almacen.nombre_almacen}
      loading={loading}
      list={[
        {
          title: "Direccion",
          value: almacen.direccion === null ? "N/A" : `${almacen.direccion}`,
        },
        {
          title: "Stock",
          value: almacen.stock_total === null ? "0" : `${almacen.stock_total}`,
        },
      ]}
    />
  );
};

export default AlmacenCard;

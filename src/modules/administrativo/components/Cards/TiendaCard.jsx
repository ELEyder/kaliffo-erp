import { useEffect } from "react";
import { DefaultCard } from "../../../../components/UI";
import { useReporte, useTienda } from "../../hooks";
import { Button } from "antd";

const TiendaCard = ({ id }) => {
  const { tienda, getTienda } = useTienda();
  const { getReporteTienda } = useReporte();

  useEffect(() => {
    getTienda(id);
  }, [id]);

  return (
    <DefaultCard
      title={tienda.tienda}
      list={[
        {
          title: "DIRECCIÓN",
          value: tienda.direccion,
        },
        {
          title: "TELÉFONO",
          value: tienda.telefono,
        },
        {
          title: "STOCK TOTAL",
          value: tienda.total_stock,
        },
        {
          title: "VENTAS TOTALES",
          value: tienda.ventas,
        },
        {
          title: "PERSONAL ASIGNADO",
          value: tienda.total_usuarios,
        },
      ]}
    >
      <Button onClick={() => getReporteTienda(id)} type="primary" block>
        OBTENER REPORTE
      </Button>
    </DefaultCard>
  );
};

export default TiendaCard;

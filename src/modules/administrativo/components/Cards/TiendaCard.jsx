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
          value: tienda.direccion == null ? "0" : `${tienda.direccion}`,
        },
        {
          title: "TELÉFONO",
          value: tienda.telefono == null ? "0" : `${tienda.telefono}`,
        },
        {
          title: "STOCK TOTAL",
          value: tienda.total_stock == null ? "0" : `${tienda.total_stock}`,
        },
        {
          title: "VENTAS TOTALES",
          value: tienda.ventas == null ? "0" : `${tienda.ventas}`,
        },
        {
          title: "PERSONAL ASIGNADO",
          value:
            tienda.total_usuarios == null ? "0" : `${tienda.total_usuarios}`,
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

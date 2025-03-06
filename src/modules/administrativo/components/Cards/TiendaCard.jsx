import { getReporteTienda } from "@AA/Reporte"; // Función para obtener el reporte de la tienda
import { DefaultCard } from "../../../../components/UI";
import { useTienda } from "../../hooks";
import { Button } from "antd";
import { useEffect } from "react";

const TiendaCard = ({ id }) => {
  const { tienda, getTienda } = useTienda();

  useEffect(() => {
    getTienda(id);
  }, [id]);

  return (
    <DefaultCard
      title={tienda.tienda}
      list={[
        // Definir los datos que se mostrarán en la lista
        {
          title: "DIRECCIÓN",
          value: tienda.direccion == null ? "0" : `${tienda.direccion}`,
        }, // Dirección de la tienda
        {
          title: "TELÉFONO",
          value: tienda.telefono == null ? "0" : `${tienda.telefono}`,
        }, // Teléfono de la tienda
        {
          title: "STOCK TOTAL",
          value: tienda.total_stock == null ? "0" : `${tienda.total_stock}`,
        }, // Stock total
        {
          title: "VENTAS TOTALES",
          value: tienda.ventas == null ? "0" : `${tienda.ventas}`,
        }, // Ventas totales
        {
          title: "PERSONAL ASIGNADO",
          value: tienda.total_usuarios == null ? "0" : `${tienda.total_usuarios}`,
        }, // Número de personal asignado
      ]}
    >
      <Button
        onClick={() => getReporteTienda(id)} // Botón para obtener el reporte de la tienda al hacer clic
        type="primary"
        block
        style={{ fontWeight: "bold" }}
      >
        OBTENER REPORTE
      </Button>
    </DefaultCard>
  );
};

export default TiendaCard;

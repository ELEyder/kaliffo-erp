import { useParams } from "react-router-dom";
import MovimientosTable from "../../../../components/Tables/MovimientosTable";
import { Divider } from "antd";

const MovimientosMercaderiaDetalle = () => {
  const { tipo } = useParams();

  return (
    <>
      <Divider>DETALLE DE LOS ENVIOS</Divider>
      <MovimientosTable tipo={tipo} />
    </>
  );
};
export default MovimientosMercaderiaDetalle;

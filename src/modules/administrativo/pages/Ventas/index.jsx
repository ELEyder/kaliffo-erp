import { useParams } from "react-router-dom";
import { Divider } from "antd";
import { VentasPorTipoTable } from "../../components/Tables";

const VentasView = () => {
  const { tipo } = useParams();

  return (
    <>
      <Divider> {tipo} </Divider>

      <VentasPorTipoTable tipo={tipo} />
    </>
  );
};

export default VentasView;

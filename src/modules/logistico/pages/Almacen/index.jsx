import { useParams } from "react-router-dom";
import { Divider } from "antd";
import { ProductosPorAlmacenTable } from "../../components/Tables";
import { AlmacenCard } from "../../components/Cards";
import { Details } from "../../../../layouts";

const Almacen = () => {
  const { id } = useParams();

  return (
    <>
      <Divider>DETALLES DEL ALMACEN</Divider>

      <Details>
        <AlmacenCard id={id} />

        <ProductosPorAlmacenTable id={id} />
      </Details>
    </>
  );
};

export default Almacen;

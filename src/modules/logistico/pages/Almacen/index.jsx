import { useParams } from "react-router-dom";
import { Divider } from "antd";

import ProductosPorAlmacenTable from "../../components/Tables/ProductosPorAlmacenTable";
import AlmacenCard from "../../components/Cards/AlmacenCard";
import Details from "../../../../layouts/Details";

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

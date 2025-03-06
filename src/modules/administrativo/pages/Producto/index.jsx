import { Divider, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { Details } from "../../../../layouts";
import { ProductoCard } from "../../components/Cards";
import {
  StockPorTiendaTable,
  StockPorTallaTable,
  StockPorColoresTable,
} from "../../components/Tables";

const ProductoView = () => {
  const { id } = useParams();

  const items = [
    {
      key: "1",
      label: "Stock por tienda",
      children: <StockPorTiendaTable id={id} />,
    },
    {
      key: "2",
      label: "Stock por Tallas",
      children: <StockPorTallaTable id={id} />,
    },
    {
      key: "3",
      label: "Stock por Colores",
      children: <StockPorColoresTable id={id} />,
    },
  ];
  return (
    <>
      <Divider>DETALLES DEL PRODUCTO</Divider>
      <Details>
        <ProductoCard id={id} />
        <Tabs items={items} />
      </Details>
    </>
  );
};

export default ProductoView;

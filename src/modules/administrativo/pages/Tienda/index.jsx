import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { Details } from "../../../../layouts";
import { TiendaCard } from "../../components/Cards";
import {
  ProductosTable,
  VentasTable,
  PersonalTable,
} from "../../components/Tables";

const TiendaView = () => {
  const { id } = useParams();

  const items = [
    {
      key: "1",
      label: "Productos (No test)",
      children: <ProductosTable id={id} />,
    },
    {
      key: "2",
      label: "Personal",
      children: <PersonalTable tienda_id={id} />,
    },
    {
      key: "3",
      label: "Ventas",
      children: <VentasTable id={id} />,
    },
  ];

  return (
    <>
      <Details>
        <TiendaCard id={id} />

        <Tabs items={items} />
      </Details>
    </>
  );
};

export default TiendaView;

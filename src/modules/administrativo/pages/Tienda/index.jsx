import { useParams } from "react-router-dom";

import { Tabs } from "antd";
import ProductosTable from "../../components/Tables/ProductosTable";
import { Details } from "../../../../layouts";
import TiendaDetailCard from "../../components/Cards/TiendaDetailCard";
import TrabajadoresTable from "../../components/Tables/TrabajadoresTable";
import VentasTable from "../../components/Tables/VentasTable";

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
      children: <TrabajadoresTable params={`?tienda_id=${id}`} />,
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
        <TiendaDetailCard id={id} />

        <Tabs items={items} />
      </Details>
    </>
  );
};

export default TiendaView;

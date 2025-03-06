import { Divider } from "antd";
import ProductosTable from "../../components/Tables/ProductosTable";

const Productos = () => {

  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>
        Productos
      </Divider>

      <ProductosTable />

    </>
  );
};

export default Productos;

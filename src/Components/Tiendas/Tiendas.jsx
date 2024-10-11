import React from "react";
import Plantilla from "../../Shared/Plantilla";
import TiendasCards from "./Cards/TiendasCards";
import { Divider } from "antd";

const Tiendas_main = () => {
  return (
    <Plantilla>
      <Divider>TIENDAS</Divider>
      <TiendasCards />

    </Plantilla>
  );
};

export default Tiendas_main;

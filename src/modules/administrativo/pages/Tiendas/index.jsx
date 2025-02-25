import React from "react";
import TiendasCards from "../../components/Cards/TiendasCards";
import { Divider } from "antd";

const TiendasView = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>Tiendas</Divider>
      <TiendasCards />
      <Divider></Divider>
    </>
  );
};

export default TiendasView;

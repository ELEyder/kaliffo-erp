import React, { useState , useEffect} from "react";
import CortesTable from "../../Components/Tables/CortesTable";
import TimeLine from "../../Components/TimeLine/TimeLine";
import Status from "../../Components/Status/Status";
import { getFase } from "../../Shared/api/Lote";
import { Divider } from "antd";
import { useParams } from "react-router-dom";


const Lote = () => {
  const { id } = useParams();
  const [fase, setFase] = useState(0);

  useEffect(() => {
    getFase(id, setFase);
  }, [id]);

  let contenido;
  if (fase === "cortes") {
    contenido = <CortesTable />;
  }
  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine></TimeLine>
      {contenido}
      <Status/>
    </>
  )
}

export default Lote
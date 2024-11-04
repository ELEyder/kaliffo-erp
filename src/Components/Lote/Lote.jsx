import React from "react";
import Cortes from "./Cortes/Cortes";
import TimeLine from "./TimeLine/TimeLine";
import { getFase } from "../../../../Shared/api/Lote";
import { Divider } from "antd";
import { useParams } from "react-router-dom";


const Lote = () => {
  const { id } = useParams();
  const [fase, setFase] = useState([]);

  useEffect(() => {
    getFase(id, setFase);
  }, [id, reload]);

  let contenido;
  if (fase === "cortes") {
    contenido = <Cortes />;
  }
  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine></TimeLine>
      {contenido}
    </>
  )
}

export default Lote
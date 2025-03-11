import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Flex } from "antd";
import { getMovimientos } from "@AL/MovimientosMercaderia";

const { Meta } = Card;

const MovimientosTiposCards = () => {
  const navigate = useNavigate();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    getMovimientos(setMovimientos);
  }, []);

  return (
    <>
      <Flex wrap gap={"middle"} justify="space-evenly">
      {movimientos.map((movimiento, index) => (
         <Card
         hoverable
         onClick={() => navigate(`/logistico/movimientos/historial/${movimiento.tipo}`)}
         key={index}
         style={{
           width: "400px",
           overflow: "hidden",
           textAlign: "center",
         }}
         styles={{
           header: { textAlign: "center", textTransform: "uppercase" },
         }}
         title={
          movimiento.tipo === "AT"
             ? "MOVIMIENTOS DE ALMACÉN A TIENDA"
             : "MOVIMIENTOS DE TIENDA A TIENDA"
         }
       >
         <Meta
           style={{ textAlign: "left" }}
           title={`Cantidad de movimientos: ${movimiento.cantidad}`}
         />
       </Card>
      ))}
      </Flex>
    </>
  );
};

export default MovimientosTiposCards;

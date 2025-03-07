import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas
import { Card, Flex, FloatButton, Popconfirm, Tooltip, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getMovimientos } from "@AL/MovimientosMercaderia"; // Función para obtener los productos del almacén

const { Meta } = Card;

const MovimientosTiposCards = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("");
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    getMovimientos(setMovimientos);
  }, []);

  return (
    <>
      {/* Muestra los almacenes en tarjetas */}
      <Flex wrap gap={"middle"} justify="space-evenly">
      {Object.keys(movimientos).map((tipo, index) => (
         <Card
         hoverable
         onClick={() => navigate(`/movimientos/historial/${tipo}`)}
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
           tipo === "AT"
             ? "MOVIMIENTOS DE ALMACÉN A TIENDA"
             : "MOVIMIENTOS DE TIENDA A TIENDA"
         }
       >
         <Meta
           style={{ textAlign: "left" }}
           title={`Cantidad de movimientos: ${movimientos[tipo]}`}
         />
       </Card>
      ))}
      </Flex>
    </>
  );
};

export default MovimientosTiposCards;

import React, { useState, useEffect } from "react"; // Hooks de React
import { useParams } from "react-router-dom"; // Hook de React Router para acceder a los parámetros de la URL
import { getTiendaById } from "@AA/Tienda"; // Función para obtener los datos de la tienda por su ID
import { Card, List, Button, Typography } from "antd"; // Componentes de Ant Design para el diseño y la interfaz de usuario
import { getReporteTienda } from "@AA/Reporte"; // Función para obtener el reporte de la tienda
const { Paragraph, Text } = Typography;
const TiendaCard = () => {
  const { id } = useParams(); // Extraer el ID de la tienda desde los parámetros de la URL
  const [tienda, setTienda] = useState([]); // Estado para almacenar los datos de la tienda

  // Obtener los datos de la tienda cuando el componente se monta o cuando el ID de la tienda cambia
  useEffect(() => {
    getTiendaById(id, setTienda); // Llamar a la función para obtener los detalles de la tienda según el ID
  }, [id]); // El arreglo de dependencias, dispara el efecto cuando cambia `id`

  return (
    <Card
      style={{ width: 400, textAlign: "center" }}
      title={tienda.tienda} // Mostrar el nombre de la tienda como título de la tarjeta
      actions={[
        <Button
          onClick={() => getReporteTienda(id)} // Botón para obtener el reporte de la tienda al hacer clic
          type="primary"
          block
          style={{ fontWeight: "bold" }}
        >
          OBTENER REPORTE
        </Button>,
      ]}
    >
      {/* Lista que muestra la información de la tienda */}
      <List
        itemLayout="horizontal" // Disponer los elementos de la lista horizontalmente
        dataSource={[
          // Definir los datos que se mostrarán en la lista
          {
            title: "DIRECCIÓN",
            value: tienda.direccion == null ? "0" : `${tienda.direccion}`,
          }, // Dirección de la tienda
          {
            title: "TELÉFONO",
            value: tienda.telefono == null ? "0" : `${tienda.telefono}`,
          }, // Teléfono de la tienda
          {
            title: "STOCK TOTAL",
            value: tienda.total_stock == null ? "0" : `${tienda.total_stock}`,
          }, // Stock total
          {
            title: "VENTAS TOTALES",
            value: tienda.ventas == null ? "0" : `${tienda.ventas}`,
          }, // Ventas totales
          { title: "PERSONAL ASIGNADO", value: `${tienda.total_usuarios}` }, // Número de personal asignado
        ]}
        renderItem={(
          item // Renderizar cada elemento de la lista
        ) => (
          <List.Item>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <strong>{item.title}:</strong>
              <Paragraph copyable>{item.value}</Paragraph>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TiendaCard; // Exportar el componente TiendaCard

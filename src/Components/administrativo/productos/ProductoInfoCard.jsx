import { Card, List, Button, Divider, Typography, Image } from "antd"; // Importa los componentes de Ant Design
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import { getProductoById } from "@AA/Producto"; // Función para obtener los detalles del producto
const { Paragraph } = Typography;

const ProductoInfoCard = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde los parámetros de la URL
  const [producto, setProducto] = useState([]); // Estado para almacenar los datos del producto

  // Efecto para obtener los detalles del producto cuando el ID cambia
  useEffect(() => {
    getProductoById(id, setProducto); // Llama a la función para obtener los detalles del producto
  }, [id]); // El efecto se ejecuta cuando el `id` cambia

  const imgSrc = `/img/productos/${producto.producto_id}.png`; // Ruta de la imagen del producto

  return (
    <>
      {producto && ( // Verifica si el producto está cargado
        <Card
          style={{ maxWidth: 300, textAlign: "center", margin: "auto" }} // Estilos del card
          title={producto.nombre} // Título del card con el nombre del producto
          cover={
            <Image
              alt="example" // Texto alternativo para la imagen
              src={imgSrc} // Ruta de la imagen
              fallback="https://i.pinimg.com/736x/a1/cd/44/a1cd44f6617beebb9794877ef59082a1.jpg"
              style={{ width: "100%", height: "auto" }} // Estilos de la imagen para ajustarla al card
            />
          }
        >
          <List
            itemLayout="horizontal" // Diseño de los elementos de la lista en una fila horizontal
            dataSource={[ // Datos que se mostrarán en la lista
              { title: "STOCK TOTAL", value: producto.stockTotal },
              { title: "PRECIO", value: producto.precioBase },
              { title: "COLORES", value: producto.cantidad_colores },
            ]}
            renderItem={(item) => ( // Renderiza cada ítem de la lista
              <List.Item>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <strong>{item.title}:</strong>
                  <Paragraph copyable>{item.value}</Paragraph>
                </div>
              </List.Item>
            )}
          />
          <Divider></Divider> {/* Línea divisoria */}
          <Button type="primary" block style={{ fontWeight: "bold" }}> {/* Botón para obtener reporte */}
            OBTENER REPORTE
          </Button>
        </Card>
      )}
    </>
  );
};

export default ProductoInfoCard;

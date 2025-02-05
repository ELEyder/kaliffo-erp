import { Card, List, Button, Divider } from "antd"; // Importa los componentes de Ant Design
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import { getProductoById } from "@AA/Producto"; // Función para obtener los detalles del producto

const ProductoInfoCard = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde los parámetros de la URL
  const [producto, setProducto] = useState([]); // Estado para almacenar los datos del producto

  // Efecto para obtener los detalles del producto cuando el ID cambia
  useEffect(() => {
    getProductoById(id, setProducto); // Llama a la función para obtener los detalles del producto
  }, [id]); // El efecto se ejecuta cuando el `id` cambia

  const imgSrc = `img/productos/${producto.producto_id}.png`; // Ruta de la imagen del producto

  // Maneja el error en caso de que la imagen no exista
  const handleError = (e) => {
    e.target.src = "img/productos/generic.png"; // Asigna una imagen genérica si no se encuentra la imagen del producto
  };

  return (
    <>
      {producto && ( // Verifica si el producto está cargado
        <Card
          style={{ maxWidth: 300, textAlign: "center", margin: "auto" }} // Estilos del card
          title={producto.nombre} // Título del card con el nombre del producto
        >
          <img
            alt="example" // Texto alternativo para la imagen
            src={imgSrc} // Ruta de la imagen
            onError={handleError} // Llama a la función handleError si hay un error con la imagen
            style={{ width: "100%", height: "auto" }} // Estilos de la imagen para ajustarla al card
          />
          <List
            itemLayout="horizontal" // Diseño de los elementos de la lista en una fila horizontal
            dataSource={[ // Datos que se mostrarán en la lista
              { title: "STOCK TOTAL", value: producto.stockTotal },
              { title: "PRECIO", value: producto.precioBase },
              { title: "COLORES", value: producto.cantidad_colores },
            ]}
            renderItem={(item) => ( // Renderiza cada ítem de la lista
              <List.Item>
                <b>{item.title}</b> {/* Muestra el título en negrita */}
                <span style={{ float: "right" }}>{item.value}</span> {/* Muestra el valor a la derecha */}
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

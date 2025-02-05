import { Button } from "antd";

export const getColumnas = (changeModal, setDetalleColor) => {
  // Definir las columnas para la tabla de productos
  const columnas = [
    {
      title: "Color", // Título de la columna
      dataIndex: "color_nombre", // Indica que el nombre del color se encuentra en `color_nombre`
      key: "color_nombre", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
    },
    {
      title: "Stock", // Título de la columna
      dataIndex: "stock", // Indica que la cantidad de stock se encuentra en `stock`
      key: "stock", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      sorter: {
        compare: (a, b) => a.stock - b.stock, // Permite ordenar la columna por stock
        multiple: 2, // Define que esta columna puede ser ordenada por `stock`
      },
      // Personaliza el estilo de las celdas según el valor del stock
      onCell: (record) => ({
        style: {
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
              ? '#f54242' // Rojo si el stock es menor o igual a 20
              : '#FCFB77', // Amarillo si el stock está entre 20 y 50
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Cambia el color del texto
          padding: "10px", // Añade espacio dentro de las celdas
        }
      }),
    },
    {
      title: "Ver más", // Título de la columna
      key: "verMas", // Llave única para la columna
      align: "center", // Alinea el contenido al centro
      render: (text, record) => { // Renderiza un botón "Ver más"
        return (
          <Button
            type="primary"
            style={{ width: "55px" }}
            block
            onClick={() => {
              setDetalleColor(record.productoDetalle_id); // Establece el ID del detalle del producto
              changeModal('colorD', true); // Abre el modal de detalle
            }}
          >
            +
          </Button>
        );
      },
    },
  ];


  return columnas
}

export const getUrl = (id) => {
  return `producto/detalle/${id}?tipo=colores`
}
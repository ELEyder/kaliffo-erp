import { Button } from "antd";

export const getColumnas = (changeModal, setIdT, reload) => {
// Definir las columnas para la tabla de productos
const columnas = [
    {
      title: "Tienda", // Título de la columna
      dataIndex: "tienda", // Campo de datos a mostrar
      key: "tienda", // Clave única para la columna
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Stock Total", // Título de la columna
      dataIndex: "STOCK", // Campo de datos a mostrar
      key: "STOCK", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      onCell: (record) => ({
        // Estilo condicional basado en el stock
        style: {
          background: record.stock >= 50
            ? 'green' // Verde si el stock es mayor o igual a 50
            : record.stock <= 20
              ? '#f54242' // Rojo si el stock es menor o igual a 20
              : '#FCFB77', // Amarillo si el stock está entre 21 y 49
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto
          padding: "10px", // Espaciado interno
        }
      }),
    },
    {
      title: "Ver más", // Título de la columna
      dataIndex: "tienda_id", // Campo para identificar la tienda
      key: "verMas", // Clave única para la columna
      align: "center", // Alinear el texto al centro
      render: (text, record) => (
        <Button 
          type="primary" 
          style={{ width: "55px" }} 
          block
          onClick={() => {
            setIdT(text); // Establecer el ID de la tienda seleccionada
            changeModal("tiendaD",true); // Abrir el modal
          }}
        >
          +
        </Button>
      ),
    },
  ];

  return columnas
}

export const getUrl = (id) => {
  return `producto/detalle/${id}?tipo=tiendas`
}
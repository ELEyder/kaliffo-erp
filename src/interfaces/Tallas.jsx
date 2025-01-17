import { Button } from "antd";

export const getColumnas = (changeModal, setTalla) => {
// Definir las columnas para la tabla de productos
const columnas = [
  {
    title: "Talla", // Título de la columna
    dataIndex: "talla", // Campo de datos a mostrar
    key: "talla", // Clave única para la columna
    align: "center", // Alinear el texto al centro
  },
  {
    title: "Cantidad", // Título de la columna
    dataIndex: "cantidad", // Campo de datos a mostrar
    key: "cantidad", // Clave única para la columna
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
    key: "verMas", // Clave única para la columna
    align: "center", // Alinear el texto al centro
    render: (text, record) => (
      <Button 
        type="primary" 
        style={{ width: "55px" }} 
        block
        onClick={() => {
          setTalla(record.talla); // Establecer la talla seleccionada
          changeModal("tallaD",true); // Abrir el modal
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
  return `producto/detalle/${id}?tipo=tallas`
}
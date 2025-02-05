import { Button } from "antd";

export const getColumnas = (changeModal, setIdP) => {
  const columnas = [
    {
      title: "Producto", // Título de la columna para el nombre del producto
      key: "nombre",
      dataIndex: "nombre", // Mapear la columna al campo "nombre" en los datos
      align: "center", // Alinear el texto al centro
    },
    {
      title: "Stock", // Título de la columna para el stock
      key: "stock",
      align: "center",
      dataIndex: "stock", // Mapear la columna al campo "stock" en los datos
      defaultSortOrder: "ascend", // Orden de clasificación por defecto
      // Estilo de la celda basado en los niveles de stock
      onCell: (record) => ({
        style: {
          background:
            record.stock >= 50
              ? "green" // Verde para stock >= 50
              : record.stock <= 20
              ? "#f54242" // Rojo para stock <= 20
              : "#FCFB77", // Amarillo para stock intermedio
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black", // Ajustar el color del texto basado en el stock
          padding: "10px",
        },
      }),
    },
    {
      title: "Ver más", // Título de la columna para el botón "Ver más"
      dataIndex: "producto_id",
      key: "vermas",
      align: "center",
      // Renderizar el botón de "Ver más" para cada producto
      render: (text, record) => {
        return (
          <Button
            type="primary"
            block
            onClick={() => {
                console.log(text)
              setIdP(text); // Establecer el ID del producto seleccionado
              changeModal("proD", true); // Abrir el modal de detalles del producto
            }}
          >
            +
          </Button>
        );
      },
    },
  ];

  return columnas;
};


export const getUrl = (id) =>{
    return `producto?almacen_id=${id}`
}
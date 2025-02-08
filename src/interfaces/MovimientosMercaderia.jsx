import { Button } from "antd";

export const getColumnas = (changeModal, setIdM, tipo) => {
  let columnas = [];
  if (tipo==="AT") {
    columnas = [
      {
        title: "Codigo", // Título de la columna para el nombre del producto
        key: "codigo",
        dataIndex: "codigo", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title: "Nombre del Almacen", // Título de la columna para el nombre del producto
        key: "nombre_almacen",
        dataIndex: "nombre_almacen", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title: "Nombre de la Tienda", // Título de la columna para el nombre del producto
        key: "tienda",
        dataIndex: "tienda", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title: "Transporte", // Título de la columna para el nombre del producto
        key: "transporte",
        dataIndex: "transporte", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title: "Fecha Envio", // Título de la columna para el nombre del producto
        key: "fecha_envio",
        dataIndex: "fecha_envio", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title: "Fecha Inicio Envio", // Título de la columna para el nombre del producto
        key: "fecha_inicio_envio",
        dataIndex: "fecha_inicio_envio", // Mapear la columna al campo "nombre" en los datos
        align: "center", // Alinear el texto al centro
      },
      {
        title:"Ver mas",
        dataIndex:"movimiento_id",
        key:"vermas",
        align:"center",
        render:(text,record)=>{
            return(
                <Button
                type="primary"
                block
                onClick={()=>{
                    setIdM(text)
                    changeModal("movD",true)
                }}>
                    +
                </Button>
            )
        }
      }
    ];
  }
  return columnas
};

export const getURL = (tipo) =>{
     return `movimiento/${tipo}`
}
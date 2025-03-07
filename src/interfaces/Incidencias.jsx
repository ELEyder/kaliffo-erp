import { Flex, Button, Popconfirm } from "antd";
import { ApiClient }from "../API/ApiClient";

export const getColumnas = (changeModal, setIncidencia, reload) => {
  const columnas = [
    {
      title: "N°",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Incidencia",
      dataIndex: "tipo",
      render: (value) => {
        const incidenciaMap = {
          1: "Familiar",
          2: "Salud",
          3: "Personal",
        };
        return incidenciaMap[value] || "Desconocido";
      },
      onCell: (record) => ({
        style: {
          background: record.tipo === 1 ? '#FCFB77' :
          record.tipo === 2 ? 'orange' : '#f54242',
          color: record.tipo === 3 ? "white" : "black",
          padding: "10px",
        },
      }),
    },
    { title: "Descripción", dataIndex: "descripcion" },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fecha) => {
        if (!fecha) return "-"; // Manejar casos donde la fecha sea nula
        const date = new Date(fecha); // Convertir la fecha a objeto Date
        const day = String(date.getDate()).padStart(2, "0"); // Obtener día con dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtener mes con dos dígitos (getMonth es base 0)
        const year = date.getFullYear(); // Obtener año
        return `${day}/${month}/${year}`; // Formatear en DD/MM/YYYY
      },
    },
    {
      title: "Opciones", // Columna de opciones para editar y eliminar incidencias
      render: (record) => { // Renderizado personalizado para los botones de editar y eliminar
        return (
          <Flex gap="small" justify="center" align="middle" wrap="wrap">
            <Button type="primary" block onClick={() => {
              setIncidencia(record); // Establecer la incidencia seleccionada para editar
              changeModal("updI", true); // Abrir el modal de edición
            }}>
              Editar
            </Button>
            <Popconfirm
              title="¿Estás seguro de que deseas eliminar esta incidencia?" // Confirmación para eliminar
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={async () => {
                await ApiClient.delete(`/incidencia/delete/${record.incidencia_id}`);
                reload(); // Activar la recarga después de la eliminación
              }}
            >
              <Button block style={{ background: "#f54242", color: "white" }} danger>
                Eliminar
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return columnas;
};

export const getUrl = (id) => {
  return `/incidencia?usuario_id=${id}`;
};
